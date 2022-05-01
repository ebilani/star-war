import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/films' },
  { path: 'films',  loadChildren: () => import('./panel/films/films.module').then(m => m.FilmsModule) },
  { path: 'people',  loadChildren: () => import('./panel/people/people.module').then(m => m.PeopleModule) },
  { path: 'starships', loadChildren: () => import('./panel/starships/starships.module').then(m => m.StarshipsModule) },
  { path: 'planets',  loadChildren: () => import('./panel/planet/planet.module').then(m => m.PlanetModule)},
  { path: 'species',  loadChildren: () => import('./panel/species/species.module').then(m => m.SpeciesModule) },
  { path: 'vehicles',  loadChildren: () => import('./panel/vehicles/vehicles.module').then(m => m.VehiclesModule) },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
