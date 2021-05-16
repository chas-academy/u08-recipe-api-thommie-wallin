import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { List } from '../../../../shared/interfaces';

@Component({
  selector: 'app-read-all-lists',
  templateUrl: './read-all-lists.component.html',
  styleUrls: ['./read-all-lists.component.css']
})
export class ReadAllListsComponent implements OnInit, OnChanges {
  @Input() list: List[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // this.list.subscribe(data=>console.log(data));
    // console.log(this.list)
  }

}
