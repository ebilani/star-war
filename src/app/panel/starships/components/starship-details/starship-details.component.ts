import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Starship } from '../../models/starships.model';
import { StarshipsService } from '../../services/starships.service';

@Component({
  selector: 'star-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {
  starshipProps: any = {};
  constructor(private starshipsService: StarshipsService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showDetailsData();
  }
 
   showDetailsData(){
     /* check if emitted starship is empty (cases in reload of page) */
     if(Object.keys(this.starshipsService.selectedStarship.getValue()).length){
        this.starshipProps = this.starshipsService.selectedStarship.getValue();
    }
      else{
        this.starshipsService.getStarshipDetailOnReload(this.route.snapshot.params.id).pipe(
          tap((starShip: Starship) =>{
            this.starshipProps = starShip
          })
        ).subscribe()
      }
     }
}
