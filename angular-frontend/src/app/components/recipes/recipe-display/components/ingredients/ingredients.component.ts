import { Component, OnInit, Input } from '@angular/core';

import { ExtendedIngredient } from 'src/app/shared/models/extendedingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  @Input() recipe: ExtendedIngredient;

  constructor() { }

  ngOnInit(): void {
  }
}
