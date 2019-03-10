import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * list of routes of the application
 */
const appRoutes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
];

/**
 * the routing module of the application
 */
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
