import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, RouteConfigLoadStart, Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { filter, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { People, PeopleResponse } from 'src/app/panel/people/models/people.model';
import { PeopleService } from 'src/app/panel/people/services/people.service';
import { Planet } from 'src/app/panel/planet/models/planet.model';
import ListUtils from '../../commons/list-utils';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'star-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedModule: BehaviorSubject<string> = new BehaviorSubject(ListUtils.LINKS_LIST[0].code);
  searchedField!: string;
  searchedValues: any = JSON.parse(sessionStorage.getItem('lastSearched')!)
  constructor(public router: Router,private commonService: CommonService, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getPathOfModuleSelected();
    this.commonService.onSearchButtonClick.subscribe((list:any)=>{
      this.searchedValues = JSON.parse(sessionStorage.getItem('lastSearched')!);
    });
  }
  getPathOfModuleSelected(){
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
            this.selectedModule.next(event.url.split('/')[1]);
        }
      }
    );
  }

  onSearchClick(fieldValue:string){
    let searchedValueList: any = [];
    const selectedModule = this.selectedModule.getValue();
    if(selectedModule === ListUtils.LINKS_LIST[1].code){
      this.commonService.getSearchedValues(fieldValue,selectedModule).pipe(
        tap(el=>{
          el.count ? this.commonService.noResultsFound.next(false) : this.commonService.noResultsFound.next(true)
        }),
        switchMap((people: PeopleResponse) => {
          return from(people.results || []);
        }),
         mergeMap((result:People) =>
          this.peopleService.getHomeWorld(result.homeworld!).pipe(
            map((planet: Planet) => {
              result.homeworld = planet.name;
              searchedValueList.push(result);
              if(fieldValue){
                this.commonService.lastSavedSearchVal.next(fieldValue)
              }
              this.commonService.onSearchButtonClick.emit(searchedValueList);
            }),
          )
        ),
      ).subscribe()
    }
    else{
      this.commonService.getSearchedValues(fieldValue,selectedModule).pipe(
        tap(elements=>{
          if(fieldValue){
            this.commonService.lastSavedSearchVal.next(fieldValue)
          }
          elements.count ? this.commonService.noResultsFound.next(false) : this.commonService.noResultsFound.next(true)
          this.commonService.onSearchButtonClick.emit(elements);
        })
      ).subscribe()
    }

  }
  reuseValue(searchValue: string){
    this.searchedField = searchValue;
  }
  ngOnDestroy(){
    this.selectedModule.unsubscribe();
  }
}
