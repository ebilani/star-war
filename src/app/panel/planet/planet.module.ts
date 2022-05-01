import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetRoutingModule } from './planet-routing.module';
import { PlanetsComponent } from './components/planets/planets.component';


@NgModule({
  declarations: [
    PlanetsComponent
  ],
  imports: [
    CommonModule,
    PlanetRoutingModule
  ]
})
export class PlanetModule { }
