import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import {
  HttpService,
  BaseUrl,
  GET,
  Mockup
} from 'http-rest-decorator';
import { HeroMockup } from '../mockups/hero.mockup';


/**
 * http service of communication with webApi in the context of heroes
 */
@Injectable({
  providedIn: 'root'
})
@BaseUrl('http://mysite.com/api/hero')
export class HeroWebApi extends HttpService {

  @GET()
  @Mockup(HeroMockup.getHeroes, 2000)
  getHeroes(): Observable<Hero[]> { return null; }
}
