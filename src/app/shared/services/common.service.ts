import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  onSearchButtonClick: EventEmitter<number> = new EventEmitter();
  noResultsFound: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  lastSavedSearchVal: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) { }

  getSearchedValues = (name: string, searchedResource: string): Observable<any> =>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", name);
    return this.httpClient.get<any>(`${environment.apiUrl}/${searchedResource}`, {params:queryParams});
  }
  onlyUniqueValues(array:any) {
    array = array.filter((item:any, i:any) => array.indexOf(item) === i);
    array.length > 5 ?  array = array.slice(-5) : array;
    return array;
  }

  formatAndSaveSearched(savedSearchedValues:any, ){
    const lastSearched:any = this.lastSavedSearchVal.getValue();
    const storageSavedStrings = JSON.parse(sessionStorage.getItem('lastSearched')!);
    storageSavedStrings ?  savedSearchedValues = storageSavedStrings : savedSearchedValues
    savedSearchedValues.push(lastSearched); 
    /* get only unique values from search input */
    const unique = this.onlyUniqueValues(savedSearchedValues);
    sessionStorage.setItem("lastSearched", JSON.stringify(unique)) 
  }

  findNumberInString(stringValue:string){
    stringValue = stringValue.match(/\d+/)![0];
    return stringValue;
  }
}
