import { Planet } from '../../planet/models/planet.model';
import { Species } from '../../species/models/species.model';
import { Starship } from '../../starships/models/starships.model';
import { Vehicle } from '../../vehicles/models/vehicles.model';

export interface Films {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
  characters: [];
  planets: Planet[];
  url: string;
  created: string;
  edited: string;
}
