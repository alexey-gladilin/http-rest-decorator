import {
  NgModule,
  InjectionToken
} from '@angular/core';
import { HttpConfig } from './http.config';
import { HttpClientModule } from '@angular/common/http';

export let HTTP_CONFIG = new InjectionToken<HttpConfig>('http.config');

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class HttpRestDecoratorModule { }
