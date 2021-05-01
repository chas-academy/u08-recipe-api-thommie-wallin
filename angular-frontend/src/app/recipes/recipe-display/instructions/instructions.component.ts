import { Component, OnInit, Input } from '@angular/core';

import { Step } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  @Input() recipe: Step;
  
  constructor() { }

  ngOnInit(): void {
  }
}
