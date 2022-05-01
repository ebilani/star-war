import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { StarshipsComponent } from './components/starships/starships.component';

const routes: Routes = [
  {
    path: '',
    component: StarshipsComponent,
  },
  {
    path: ':id',
    component: StarshipDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarshipsRoutingModule {}
