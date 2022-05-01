import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './components/people/people.component';
import { HeightFormatPipe } from './pipes/heightFormat.pipe';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';


@NgModule({
  declarations: [
    PeopleComponent,
    HeightFormatPipe,
    PeopleDetailsComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
