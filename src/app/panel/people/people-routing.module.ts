import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent
  },
  {
    path: ':id',
    component: PeopleDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
