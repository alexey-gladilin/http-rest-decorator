import { Hero } from '../models/hero';

/**
 * class convert the data sent or received
 * through the web Api of heroes
 */
export class HeroAdapter {

  /**
   * converts data received from the server
   * @param heroList hero list
   */
  static getHeroesTransform(heroList: any[]): Hero[] {
    return heroList.map(item => {
      if (item.birthday) {
        item.birthday = new Date(item.birthday);
      }
      return item;
    });
  }
}
