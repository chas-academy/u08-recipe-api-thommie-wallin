import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

import { List } from '../../../../shared/interfaces';

@Component({
  selector: 'app-read-all-lists',
  templateUrl: './read-all-lists.component.html',
  styleUrls: ['./read-all-lists.component.css']
})
export class ReadAllListsComponent implements OnInit, OnChanges {
  // Lists to present in component
  @Input() list: List[];

  // List to remove
  @Output() deleteEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    // this.list.subscribe(data=>console.log(data));
    // console.log(this.list.length/2)
  }

  deleteId(event) {
    this.deleteEvent.emit(event);
  }

}
