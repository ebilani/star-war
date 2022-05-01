import { Films } from '../../films/models/films.model';

export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: [];
  films: Films[];
  url: string;
  created: string;
  edited: string;
}
