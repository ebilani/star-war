import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './components/starships/starships.component';
import { LengthFormatPipe } from './pipes/lengthFormat.pipe';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';


@NgModule({
  declarations: [
    StarshipsComponent,
    LengthFormatPipe,
    StarshipDetailsComponent
  ],
  imports: [
    CommonModule,
    StarshipsRoutingModule
  ]
})
export class StarshipsModule { }
