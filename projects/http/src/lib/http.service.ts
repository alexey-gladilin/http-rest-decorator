import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import {
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseArgAdapter } from './http.decorator';
import {
  filter,
  mergeMap
} from 'rxjs/operators';
import { HttpAdapter } from './http.adapter';

/**
 * data type transmitted over http protocol
 */
export enum MediaType {
  json = 'JSON',
  formData = 'FORM_DATA'
}

/**
 * http communication service
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * consturctor
   * @param http http service for data exchange via http protocol
   * @param webApiUrl url address of webApi service
   * @param defaultHeaders default http header
   */
  constructor(
    public http: HttpClient,
    public webApiUrl: string,
    public defaultHeaders: string | { [name: string]: string | string[] }
  ) { }

  /**
   * returns the url address of webApi
   */
  protected getBaseUrl(): string {
    return this.webApiUrl;
  }

  /**
   * returns the default http request header
   */
  protected getDefaultHeaders(): string | { [name: string]: string | string[] } {
    return this.defaultHeaders;
  }

  /**
   * responses interceptor
   * @param request request sent to the server
   * @param adapterFn call function to prepare request data
   */
  protected requestInterceptor(request: HttpRequest<any>, adapterFn?: Function[]): HttpRequest<any> {
    return HttpAdapter.baseRequestAdapter(request, adapterFn);
  }

  /**
   * responses interceptor
   * @param response$ response received from the server
   * @param adapters call function metadata to prepare response data
   */
  protected responseInterceptor<T>(response$: Observable<any>, adapters?: ResponseArgAdapter[])
    : Observable<T> {
    return response$
      .pipe(
        filter(event => {
          return event.type === HttpEventType.Response;
        }),
        mergeMap(res => HttpAdapter.baseResponseAdapter(res, adapters, this))
      );
  }

  /**
   * request interceptor (for request sync)
   * @param body request data sent to the server
   * @param adapterFn call function to prepare request data
   */
  protected requestInterceptorSync(body: any, adapterFn?: Function): HttpRequest<any> {
    return HttpAdapter.baseRequestAdapterSync(body, adapterFn);
  }

  /**
   * responses interceptor (for request sync)
   * @param body response received from the server
   * @param adapterFn call function to prepare response data
   */
  protected responseInterceptorSync(body: any, adapterFn?: Function): any {
    return HttpAdapter.baseResponseAdapterSync(body, adapterFn, this);
  }
}
