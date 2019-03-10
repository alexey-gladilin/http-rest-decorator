import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes.routing';
import { HeroesComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/**
 * module of the component of work with heroes
 */
@NgModule({
  declarations: [
    HeroesComponent,
    HeroDetailComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
