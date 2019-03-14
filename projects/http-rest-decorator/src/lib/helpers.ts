import {
  HttpParams,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {
  HttpService,
  HttpHeaderType
} from './http.service';
import { Observable } from 'rxjs';

/**
 * http request decorator
 * @param method http request type (GET, POST, PUT, etc.)
 */
export function methodBuilder(method: string) {
  return function (url: string = '') {
    return function (target: HttpService, propertyKey: string, descriptor: any) {

      const pPath = target[`${propertyKey}_path_parameters`];
      const pQuery = target[`${propertyKey}_query_parameters`];
      const pBody = target[`${propertyKey}_body_parameters`];
      const pHeaders = target[`${propertyKey}_headers_parameters`];

      descriptor.value = function (...args: any[]) {
        const body = createBody(pBody, descriptor, args);
        const resUrl = createPath(url, pPath, args);
        const params = createQuery(pQuery, args);
        const headers = createHeaders(pHeaders, descriptor, this.getDefaultHeaders(), args);

        let request = new HttpRequest(method, this.getBaseUrl() + resUrl, body, {
          headers: headers,
          params: params
        });

        if (descriptor.adapters) {
          request = this.requestInterceptor(request, descriptor.adapters.requestFn);
        }

        let obs$: Observable<HttpResponse<any>>;

        if (descriptor.mockup) {
          obs$ = this.mockupInterceptor(request, descriptor.mockup, descriptor.mockupArgs);
        } else {
          obs$ = this.http.request(request);
        }
        obs$ = this.responseInterceptor(obs$, descriptor.adapters ? descriptor.adapters.response : null);

        return obs$;
      };

      return descriptor;
    };
  };
}

/**
 * http request sync decorator
 * @param method http request type (GET, POST, PUT, etc.)
 */
export function methodBuilderSync(method: string) {
  return function (url: string) {
    return function (target: HttpService, propertyKey: string, descriptor: any) {
      const pPath = target[`${propertyKey}_path_parameters`];
      const pQuery = target[`${propertyKey}_query_parameters`];
      const pBody = target[`${propertyKey}_body_parameters`];
      const pHeaders = target[`${propertyKey}_headers_parameters`];

      descriptor.value = function (...args: any[]) {

        let body = createBody(pBody, descriptor, args);
        const resUrl = createPath(url, pPath, args);
        const params = createQuery(pQuery, args);
        const headers = createHeaders(pHeaders, descriptor, this.getDefaultHeaders(), args);

        const request = new XMLHttpRequest();
        request.open(method, this.getBaseUrl() + resUrl, false);

        Object.keys(headers).forEach(key => {
          request.setRequestHeader(key, headers[key]);
        });

        Object.keys(params).forEach(key => {
          request.setRequestHeader(key, headers[key]);
        });

        if (descriptor.adapters) {
          body = this.requestInterceptorSync(body, descriptor.adapters.requestFn);
        }

        request.send(body);

        const responseBody = JSON.parse(request.response);
        if (descriptor.adapters) {
          return this.responseInterceptorSync(responseBody, descriptor.adapters.responseFn);
        } else {
          return responseBody;
        }
      };
      return descriptor;
    };
  };
}

/**
 * decotoro parameters http request
 * @param paramName parameter type (path, query, body, header)
 */
export function paramBuilder(paramName: string) {
  return function (key: string) {
    return function (target: HttpService, propertyKey: string, parameterIndex: number) {
      const metadataKey = `${propertyKey}_${paramName}_parameters`;

      const paramObj = {
        key: key,
        parameterIndex: parameterIndex
      };

      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

/**
 * create request body
 * @param body request body
 * @param descriptor descriptor
 * @param args arguments
 */
function createBody(body: any[], descriptor: any, args: any[]): string {
  if (descriptor.isFormData) {
    return args[0];
  }
  return body ? JSON.stringify(args[body[0].parameterIndex]) : null;
}

/**
 * create request URL with parameters
 * @param url url webApi host
 * @param path url parameters names
 * @param args parameters values
 */
function createPath(url: string, path: any[], args: any[]): string {
  let resUrl = url;

  if (path) {
    for (const p in path) {
      if (!path.hasOwnProperty(p)) {
        continue;
      }
      const value = args[path[p].parameterIndex];

      resUrl = resUrl.replace(`{${path[p].key}}`, (value instanceof Date) ? value.toJSON() : value);
    }
  }

  const urlItems = resUrl.split('?');

  if (urlItems.length === 2) {
    let prms = urlItems[1].replace(/&\w*=undefined|\w*=undefined/gm, '');
    if (prms.length > 0 && prms[0] === '&') {
      prms = prms.substr(1);
    }
    return urlItems[0] + (prms ? '?' + prms : '');
  }

  return resUrl;
}

/**
 * create parameters for request header
 * @param query query parameters
 * @param args parameters values
 */
function createQuery(query: any[], args: any[]): HttpParams {
  const prms = new HttpParams();

  if (query) {
    query
      .filter(f => args[f.parameterIndex])
      .forEach(p => {
        const key = p.key;
        let value = args[p.parameterIndex];
        if (value instanceof Object) {
          value = JSON.stringify(value);
        }
        prms.set(encodeURIComponent(key), encodeURIComponent(value));
      });
  }
  return prms;
}

/**
 * create http request headers
 * @param headers headers
 * @param descriptor descriptor
 * @param defaultHeaders default headers
 * @param args args
 */
function createHeaders(pHeaders: any,
  descriptor: any,
  defaultHeaders: HttpHeaderType,
  args: any[])
  : HttpHeaders {
  const headers = new HttpHeaders(defaultHeaders);

  for (const p in descriptor.headers) {
    if (descriptor.headers.hasOwnProperty(p)) {
      if (headers.has(p)) {
        headers.delete(p);
      }
      headers.append(p, descriptor.headers[p]);
    }
  }

  if (pHeaders) {
    for (const p in pHeaders) {
      if (pHeaders.hasOwnProperty(p)) {
        if (headers.has(p)) {
          headers.delete(p);
        }
        headers.append(pHeaders[p].key, args[pHeaders[p]].parameterIndex);
      }
    }
  }

  return headers;

}
