import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { map, mergeMap, reduce, switchMap, takeUntil, tap } from 'rxjs/operators';
import { People, PeopleResponse } from '../../models/people.model';
import { from, Subject } from 'rxjs';
import { Planet } from 'src/app/panel/planet/models/planet.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'star-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  peopleList: People[] = [];
  checkForResults!: boolean;
  savedSearchedValues: any = [];
  private onComponentDestroy: Subject<void> = new Subject<void>();
  constructor(private peopleService: PeopleService, 
             private commonService: CommonService,
             private router: Router,
             private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getListOfPeople();
    this.showAndCheckForData()
  }

  getListOfPeople() {
     this.peopleService
      .getPeopleList()
      .pipe(
        switchMap((people: PeopleResponse) => {
          return from(people.results || []);
        }),
         mergeMap((result:People) =>
          this.peopleService.getHomeWorld(result.homeworld!).pipe(
            map((planet: Planet) => {
              result.homeworld = planet.name;
              return result;
            })
          )
        ),
        map((mappedPersonObj: People) => {
          this.peopleList.push(mappedPersonObj)
        }),
        takeUntil(this.onComponentDestroy)
      ).subscribe()
  }
 
  showAndCheckForData(){
    this.commonService.noResultsFound.pipe(
      tap((areData:boolean)=>{
        this.checkForResults = areData}),
        takeUntil(this.onComponentDestroy)
    ).subscribe()
    this.commonService.onSearchButtonClick.pipe(
      tap((list:any)=>{
        this.peopleList = list;
        this.commonService.formatAndSaveSearched(this.savedSearchedValues);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe()
  }

  getDetailsOfPeople(url:string){
    this.peopleService.getPeopleDetail(url).pipe(
      tap((person: People)=>{
        const idSelected: string = this.commonService.findNumberInString(url);
        this.peopleService.selectedPerson.next(person);
        this.router.navigate([`${idSelected}`], {
          relativeTo: this.route,
        });
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe()
  }
  ngOnDestroy(){
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }
}
