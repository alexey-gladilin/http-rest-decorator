import {
  NgModule,
  InjectionToken
} from '@angular/core';
import { HttpConfig } from './http.config';

export let HTTP_CONFIG = new InjectionToken<HttpConfig>('http.config');

@NgModule({
  imports: [
  ],
  exports: []
})
export class HttpModule { }
