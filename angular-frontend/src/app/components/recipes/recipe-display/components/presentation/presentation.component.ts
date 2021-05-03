import { Component, OnInit, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { FavouritesService } from '../../../../../core/services/favourites.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private favouritesService: FavouritesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  addToFavourites(recipe) {  
    this.favouritesService.addToFavourites(recipe);
    this._snackBar.open('Recipe added to favourites.', 'OK', {
      duration: 3000
    });
  }

}
