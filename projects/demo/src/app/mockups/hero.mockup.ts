import { Hero } from '../models/hero';
import { HttpRequest } from '@angular/common/http';

/**
 * the class of test data generation
 */
export class HeroMockup {

  private static _heroes = [
    { id: 11, name: 'Mr. Nice', birthday: '1970-03-15' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas', birthday: '1983-04-10' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama', birthday: '1990-10-05' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  /**
   * hero list
   */
  static getHeroes(): any[] {
    return [...HeroMockup._heroes];
  }

  /**
   * returns the hero
   * @param request http request to web server
   */
  static getHero(request: HttpRequest<any>): any {
    const that: any = this;

    const id = parseInt(request.url.replace(that.getBaseUrl(), ''), 10);

    return { ...HeroMockup._heroes.find(h => h.id === id) };
  }

  /**
   * the hero saves the data and returns the updated information
   * @param request http request to web server
   */
  static updateHero(request: HttpRequest<any>): any {
    const requestHero = JSON.parse(request.body);

    const hero = HeroMockup._heroes.find(h => h.id === requestHero.id);

    hero.name = requestHero.name;

    return hero;
  }
}
