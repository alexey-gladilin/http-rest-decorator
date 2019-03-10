import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../models/hero';
import { HeroWebApi } from '../../services/hero.webapi';

/**
 * hero list display component
 */
@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroesComponent implements OnInit {

  /**
   * hero list
   */
  heroes$: Observable<Hero[]>;

  /**
   * the constructor for dependency injection
   * @param heroWebApi hero service webApi
   */
  constructor(private heroWebApi: HeroWebApi) { }

  /**
   * hook the life cycle of the component
   * initialization data
   */
  ngOnInit() {
    this.heroes$ = this.heroWebApi.getHeroes();
  }

}
