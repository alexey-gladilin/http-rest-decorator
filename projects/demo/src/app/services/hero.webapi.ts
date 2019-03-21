import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import {
  HttpService,
  BaseUrl,
  GET,
  Mockup,
  Path,
  Body,
  POST,
  Adapter
} from 'http-rest-decorator';
import { HeroMockup } from '../mockups/hero.mockup';
import { HeroAdapter } from '../adapters/hero.adapter';


/**
 * http service of communication with webApi in the context of heroes
 */
@Injectable()
@BaseUrl('http://mysite.com/api/hero')
export class HeroWebApi extends HttpService {

  /**
   * returns a list of heroes.
   * test data is used.
   * if you remove the decorator Mockup, the call will be made
   * to web Api via http Protocol
   */
  @GET()
  @Mockup(HeroMockup.getHeroes)
  @Adapter({
    response: [{
      fn: HeroAdapter.getHeroesTransform
    }]
  })
  getHeroes(): Observable<Hero[]> { return null; }

  /**
   * returns the hero
   * test data is used
   * @param id the ID of the hero
   */
  @GET('{id}')
  @Mockup(HeroMockup.getHero)
  getHero(@Path('id') id: number): Observable<Hero> { return null; }

  /**
   * saves the data of the hero
   * @param request data to update
   */
  @POST()
  @Mockup(HeroMockup.updateHero)
  updateHero(@Body('request') request: Hero): Observable<Hero> { return null; }
}
