import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  createListForm: FormGroup;

  @Output() newNamingEvent = new EventEmitter<string>();

  constructor(
    public formBuilder: FormBuilder,
  ) { 
    this.createListForm = this.formBuilder.group({
      title: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.newNamingEvent.emit(this.createListForm.value)
    this.createListForm.reset();
  }
}
