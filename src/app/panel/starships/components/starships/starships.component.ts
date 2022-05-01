import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
import { Starship, StarshipResponse } from '../../models/starships.model';
import { StarshipsService } from '../../services/starships.service';

@Component({
  selector: 'star-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {
  starShipList: Starship[] = [];
  checkForResults!: boolean;
  savedSearchedValues: any = []
  constructor(private starshipsService: StarshipsService, 
              private commonService: CommonService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStarShipList();
    this.showAndCheckForData();
  }
  getStarShipList(){
    this.starshipsService.getStarshipsList().pipe(
      tap((el: StarshipResponse)=>{
        this.starShipList = el.results;
        console.log(el)
      })
    ).subscribe()
  }

  showAndCheckForData(){
    this.commonService.noResultsFound.subscribe((areData:boolean)=>{
        this.checkForResults = areData
    })
    this.commonService.onSearchButtonClick.subscribe((list:any)=>{
      console.log(list)
      this.starShipList = list.results;
      this.commonService.formatAndSaveSearched(this.savedSearchedValues);
    })
  }
  getDetails(url:string){
    this.starshipsService.getStarshipDetail(url).pipe(
      tap((starship: Starship)=>{
        const idSelected: string = this.commonService.findNumberInString(url);
        this.starshipsService.selectedStarship.next(starship);
        this.router.navigate([`${idSelected}`], {
          relativeTo: this.route,
        });
      })
    ).subscribe()
  }
}
