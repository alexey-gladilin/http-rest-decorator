import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HeroesModule } from './heroes/heroes.module';
import { HttpClientModule } from '@angular/common/http';
import {
  HTTP_CONFIG,
  HttpConfig
} from 'http-rest-decorator';

/**
 * default http service configuration settings
 */
export const DEFAULT_HTTP_CONFIG: HttpConfig = {
  Url: 'api.heroes.com',
  Headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'DataType': 'application/json'
  }
};

/**
 * main module application
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeroesModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_CONFIG, useValue: DEFAULT_HTTP_CONFIG }],
  bootstrap: [AppComponent]
})
export class AppModule { }
