import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Hero } from '../../models/hero';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HeroWebApi } from '../../services/hero.webapi';

/**
 * detailed information on the hero
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  /**
   * the constructor for dependency injection
   * @param route information about the current route
   * @param router used for navigation
   * @param heroWebApi hero service webApi
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroWebApi: HeroWebApi
  ) { }

  /**
   * hook the life cycle of the component
   * initialization data
   */
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const heroId = parseInt(params.get('id'), 10);
        return this.heroWebApi.getHero(heroId);
      })
    )
      .subscribe({
        next: x => this.hero = x
      });
  }

  /**
   * back button click event handler
   */
  onBackClick() {
    this.router.navigate(['/heroes']);
  }

  /**
   * save button click event handler
   */
  onSaveClick() {
    this.heroWebApi.updateHero(this.hero)
      .subscribe({
        next: x => alert('saved successfully')
      });
  }

}
