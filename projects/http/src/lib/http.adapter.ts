import {
  HttpResponse,
  HttpRequest
} from '@angular/common/http';
import { ResponseArgAdapter } from './http.decorator';
import {
  Observable,
  of,
  throwError
} from 'rxjs';

/**
 * the base class for transforming the http request data before sending
 *  as well as transforming the http data response after receiving
 */
export class HttpAdapter {

  /**
   * basic method for transforming http response data
   * @param response http response
   * @param adapters metadata of functions that are called for data transformation
   * @param webApiservice the service that initiated the call
   */
  static baseResponseAdapter(
    response: HttpResponse<any>,
    adapters?: ResponseArgAdapter[],
    webApiservice?: any
  ): Observable<any> {
    if (response.status === 200) {
      try {
        if (adapters) {
          let responseBody = response.body;

          adapters.forEach(item => responseBody = item.fn
            .call(this, responseBody, item.args, webApiservice));

          return of(responseBody);
        } else {
          return of(response.body);
        }
      } catch (err) {
        return throwError(err);
      }
    }
    return of(response);
  }

  /**
   * basic method for transforming request data
   * @param request http request
   * @param adapterFn metadata of functions that are called for data transformation
   */
  static baseRequestAdapter(request: HttpRequest<any>, adapterFn?: Function[]): HttpRequest<any> {
    if (adapterFn) {
      adapterFn.forEach(fn => () => fn.call(this, request));
    }

    return request;
  }

  /**
   * basic method for transforming asynchronous request data
   * @param body body request
   * @param adapterFn function that is called to transform the data
   */
  static baseRequestAdapterSync(body: any, adapterFn?: Function) {
    return adapterFn ? adapterFn.call(this, body) : body;
  }

  /**
   * basic method for transformating asycnchronous response data
   * @param body body response
   * @param adapterFn function tha is called to transform the data
   * @param webApiService the service that initiated the call
   */
  static baseResponseAdapterSync(body, adapterFn?: Function, webApiService?: any) {
    return adapterFn ? adapterFn.call(this, body, webApiService) : body;
  }
}
