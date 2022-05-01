import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planet } from '../../planet/models/planet.model';
import { People, PeopleResponse } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  protected baseUrlRelativeToApi = 'people';
  selectedPerson: BehaviorSubject<People> = new BehaviorSubject<People>({});

  constructor(private httpClient: HttpClient) { }


  getPeopleList = (): Observable<PeopleResponse> => this.httpClient.get<PeopleResponse>(`${environment.apiUrl}/${this.baseUrlRelativeToApi}`);
  getHomeWorld = (url: string): Observable<Planet> => this.httpClient.get<Planet>(url);
  getPeopleDetail = (url:string): Observable<People> => this.httpClient.get<People>(`${url}`);
  getPeopleDetailOnReload = (id:number): Observable<People> => this.httpClient.get<People>(`${environment.apiUrl}/${this.baseUrlRelativeToApi}/${id}`);
}
