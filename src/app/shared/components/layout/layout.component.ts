import { Component, OnInit } from '@angular/core';
import ListUtils from 'src/app/shared/commons/list-utils';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'star-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  listOfLinks: {label: string, code: string}[] = ListUtils.LINKS_LIST;
  constructor() { }
  ngOnInit(): void {
  
  }

}
