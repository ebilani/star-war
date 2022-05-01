import { Films } from '../../films/models/films.model';
import { Species } from '../../species/models/species.model';
import { Starship } from '../../starships/models/starships.model';
import { Vehicle } from '../../vehicles/models/vehicles.model';

export interface People {
  name?: string;
  birth_year?: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  skin_color?: string;
  homeworld?: string;
  films?: Films[];
  species?: Species[];
  starships?: Starship[];
  vehicles?: Vehicle[];
  url?: string;
  created?: string;
  edited?: string;
}

export interface PeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: People[];
}
