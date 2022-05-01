import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { People } from '../../models/people.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'star-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {
  personProps: any = {};
  private onComponentDestroy: Subject<void> = new Subject<void>();
  constructor(private peopleService: PeopleService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showDetailsData();
  }
 
   showDetailsData(){
     const personDetailsSaved:People = this.peopleService.selectedPerson.getValue();
     /* check if emitted starship is empty (cases in reload of page) */
     if(Object.keys(personDetailsSaved).length){
        this.personProps = personDetailsSaved;
    }
      else{
        this.peopleService.getPeopleDetailOnReload(this.route.snapshot.params.id).pipe(
          tap((person: People) =>{
            this.personProps = person
          }),
          takeUntil(this.onComponentDestroy)
        ).subscribe()
      }
     }
     ngOnDestroy(){
      this.peopleService.selectedPerson.unsubscribe()
      this.onComponentDestroy.next();
      this.onComponentDestroy.complete();
    }
}
