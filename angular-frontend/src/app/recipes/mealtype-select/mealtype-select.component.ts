import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mealtype-select',
  templateUrl: './mealtype-select.component.html',
  styleUrls: ['./mealtype-select.component.css']
})
export class MealtypeSelectComponent implements OnInit {

  selected: string = 'None';

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // Send selected value to parent
  sendMessage(selected) {
    this.messageEvent.emit(this.selected)
  }

}
