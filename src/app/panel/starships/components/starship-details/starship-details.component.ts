import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Starship } from '../../models/starships.model';
import { StarshipsService } from '../../services/starships.service';

@Component({
  selector: 'star-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {
  starshipProps: any = {};
  private onComponentDestroy: Subject<void> = new Subject<void>();
  constructor(private starshipsService: StarshipsService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showDetailsData();
  }
 
   showDetailsData(){
     const selectedStarship: Starship = this.starshipsService.selectedStarship.getValue();
     /* check if emitted starship is empty (cases in reload of page) */
     if(Object.keys(selectedStarship).length){
        this.starshipProps = selectedStarship;
    }
      else{
        this.starshipsService.getStarshipDetailOnReload(this.route.snapshot.params.id).pipe(
          tap((starShip: Starship) =>{
            this.starshipProps = starShip
          }),
          takeUntil(this.onComponentDestroy)
        ).subscribe()
      }
     }
     ngOnDestroy(){
      this.onComponentDestroy.next();
      this.onComponentDestroy.complete();
    }
}
