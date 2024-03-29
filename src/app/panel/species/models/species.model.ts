import { Films } from "../../films/models/films.model";
import { People } from "../../people/models/people.model";

export interface Species {
    name: string,
    classification: string,
    designation: string,
    average_height: string,
    average_lifespan:string,
    eye_colors: string,
    hair_colors: string,
    skin_colors: string,
    language: string,
    homeworld: string ,
    people: People[],
    films: Films[],
    url: string,
    created: string,
    edited: string,
  }
  