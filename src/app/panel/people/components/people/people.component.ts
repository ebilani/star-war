import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { map, mergeMap, reduce, switchMap, tap } from 'rxjs/operators';
import { People, PeopleResponse } from '../../models/people.model';
import { forkJoin, from, Observable } from 'rxjs';
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
  savedSearchedValues: any = []
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
      ).subscribe()
  }
 
  showAndCheckForData(){
    this.commonService.noResultsFound.subscribe((areData:boolean)=>{
        this.checkForResults = areData
    })
    this.commonService.onSearchButtonClick.subscribe((list:any)=>{
      this.peopleList = list;
      this.commonService.formatAndSaveSearched(this.savedSearchedValues);
    })
  }

  getDetailsOfPeople(url:string){
    this.peopleService.getPeopleDetail(url).pipe(
      tap((person: People)=>{
        const idSelected: string = this.commonService.findNumberInString(url);
        this.peopleService.selectedPerson.next(person);
        this.router.navigate([`${idSelected}`], {
          relativeTo: this.route,
        });
      })
    ).subscribe()
  }
}
