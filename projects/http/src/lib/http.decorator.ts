import {
  methodBuilder,
  methodBuilderSync,
  paramBuilder
} from './helpers';
import {
  HttpService,
  MediaType
} from './http.service';

/**
 * request url base
 * @param url url webApi host
 */
export function baseUrl(url: string) {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    if (url && url[url.length - 1] !== '/') {
      url += '/';
    }
    target.prototype.getBaseUrl = () => url;
    return target;
  };
}

/**
 * sets the default request header for each method HttpService
 * @param pHeaders http request headers
 */
export function defaultHeaders(pHeaders: any) {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    target.prototype.getDefaultHeaders = () => pHeaders;
    return pHeaders;
  };
}

/** http method GET */
export const GET = methodBuilder('GET');

/** http method POST */
export const POST = methodBuilder('POST');

/** http method POST sync */
export const POST_SYNC = methodBuilderSync('POST');

/** http method PUT */
export const PUT = methodBuilder('PUT');

/** http method DELETE */
export const DELETE = methodBuilder('DELETE');

/** http method HEAD */
export const HEAD = methodBuilder('HEAD');

/**
 * sets a custom header for the REST method
 * @param pHeader custom key-value header
 */
export function headers(pHeader: any) {
  return function (target: HttpService, propertyKey: string, descriptor: any) {
    descriptor.headers = pHeader;

    return descriptor;
  };
}

/**
 * determines what type of data the method can send
 * @param pProduces data type that can be sent
 */
export function produces(pProduces: MediaType) {
  return function (target: HttpService, propertyKey: string, descriptor: any) {
    descriptor.isJSON = pProduces === MediaType.json;
    descriptor.isFormData = pProduces === MediaType.formData;

    return descriptor;
  };
}

/**
 * http response handler metadata
 */
export interface ResponseArgAdapter {
  /** data transformation and analysis function */
  fn: Function;
  /** parameters for the transformation/data analysis function */
  args?: any;
}

/**
 * parameters for the transformation/data analysis function
 * @param adapters functions to be called for transformation
 */
export function adapter(adapters: {
  /** handlers for preparing parameters in the called webApi */
  requestFn?: Function[],
  /** webApi response handlers */
  response: ResponseArgAdapter[]
}) {
  return function (target: HttpService, propertyKey: string, descriptor: any) {
    descriptor.adapters = adapters || {};
    return descriptor;
  };
}

/**
 * mockup data generation
 * @param fn called function to generate mockup data
 */
export function mockup(fn: Function) {
  return function (target: HttpService, propertyKey: string, descriptor: any) {
    descriptor.mockup = fn;
    return descriptor;
  };
}

/**
 * variables are passed in url
 */
export const path = paramBuilder('path');

/**
 * parameter values to determine the type of serialization of the contents of the
 * request/response MIME type 'application/x-www-form-urlencoded'
 */
export const query = paramBuilder('query');

/**
 * body REST method
 */
export const body = paramBuilder('body');

/**
 * custom REST method header
 */
export const header = paramBuilder('headers');
