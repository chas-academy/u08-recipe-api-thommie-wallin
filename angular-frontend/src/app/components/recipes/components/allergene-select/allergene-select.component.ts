import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-allergene-select',
  templateUrl: './allergene-select.component.html',
  styleUrls: ['./allergene-select.component.css']
})
export class AllergeneSelectComponent implements OnInit {

  selected: string = 'None';

  @Output() messageEvent = new EventEmitter<string>();

  // Send selected value to parent
  sendMessage(selected) {
    this.messageEvent.emit(this.selected)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
