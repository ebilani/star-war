import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Starship, StarshipResponse } from '../models/starships.model';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  protected baseUrlRelativeToApi = 'starships';
  selectedStarship: BehaviorSubject<Starship> = new BehaviorSubject<Starship>({});

  constructor(private httpClient: HttpClient) { }

  getStarshipsList = (): Observable<StarshipResponse> => this.httpClient.get<StarshipResponse>(`${environment.apiUrl}/${this.baseUrlRelativeToApi}`);
  getStarshipDetail = (url:string): Observable<Starship> => this.httpClient.get<Starship>(`${url}`);
  getStarshipDetailOnReload = (id:number): Observable<Starship> => this.httpClient.get<Starship>(`${environment.apiUrl}/${this.baseUrlRelativeToApi}/${id}`);

}
