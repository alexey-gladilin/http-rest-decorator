import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ResponseArgAdapter } from './http.decorator';
import { Observable, of, throwError } from 'rxjs';

/**
 * the base class for transforming the http request data before sending
 *  as well as transforming the http data response after receiving
 */
// @dynamic
export class HttpAdapter {

  /**
   * basic method for transforming http response data
   * @param response http response
   * @param adapters metadata of functions that are called for data transformation
   * @param webApiService the service that initiated the call
   * @param exceptionFn exception handler
   */
  static baseResponseAdapter(
    response: HttpResponse<any>,
    adapters?: ResponseArgAdapter[],
    webApiService?: any,
    exceptionFn?: Function
  ): Observable<any> {
    if (response.status === 200) {
      try {
        if (adapters) {
          let responseBody = response.body;

          adapters.forEach(item => responseBody = item.fn
            .call(this, responseBody, item.args, webApiService));

          return of(responseBody);
        } else {
          return of(response.body);
        }
      } catch (err) {
        let transformedErr = err;
        if (exceptionFn) {
          transformedErr = exceptionFn(err);
        }
        return throwError(transformedErr);
      }
    }
    return of(response);
  }

  /**
   * basic method for transforming request data
   * @param request http request
   * @param adapterFn metadata of functions that are called for data transformation
   * @param exceptionFn exception handler
   */
  static baseRequestAdapter(request: HttpRequest<any>, adapterFn?: Function[],
                            exceptionFn?: Function): HttpRequest<any> {
    if (adapterFn) {
      try {
        adapterFn.forEach(fn => fn.call(this, request));
      } catch (err) {
        let transformedErr = err;
        if (exceptionFn) {
          transformedErr = exceptionFn(err);
        }

        throw transformedErr;
      }
    }

    return request;
  }

  /**
   * basic method for transforming asynchronous request data
   * @param body body request
   * @param url URL
   * @param args query parameter
   * @param adapterFn function that is called to transform the data
   * @param exceptionFn exception handler
   */
  static baseRequestAdapterSync(body: string, url: string, args: string, adapterFn?: Function[], exceptionFn?: Function) {
    if (adapterFn) {
      try {
        adapterFn.forEach(fn => body = fn.call(this, body, url, args));
      } catch (err) {
        let transformedErr = err;
        if (exceptionFn) {
          transformedErr = exceptionFn(err);
        }

        throw transformedErr;
      }
    }

    return body;
  }

  /**
   * basic method for transformating asycnchronous response data
   * @param body body response
   * @param adapterFn function tha is called to transform the data
   * @param webApiService the service that initiated the call
   * @param exceptionFn exception handler
   */
  static baseResponseAdapterSync(body, adapterFn?: Function, webApiService?: any, exceptionFn?: Function) {
    try {
      return adapterFn ? adapterFn.call(this, body, webApiService) : body;
    } catch (err) {
      let transformedErr = err;
      if (exceptionFn) {
        transformedErr = exceptionFn(err);
      }

      throw transformedErr;
    }
  }
}
