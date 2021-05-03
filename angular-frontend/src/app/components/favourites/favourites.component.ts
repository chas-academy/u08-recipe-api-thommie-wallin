import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FavouritesService } from '../../core/services/favourites.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites = this.favouritesService.getFavourites();

  constructor(
    private favouritesService: FavouritesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  clearOneFavourite(recipe) {
    this.favouritesService.clearOneFavourite(recipe);
    this._snackBar.open('Recipe cleared from favourites.', 'OK', {
      duration: 3000
    });
  }

  clearAllFavourites() {
    this.favourites = this.favouritesService.clearAllFavourites();
    this._snackBar.open('All recipes cleared from favourites.', 'OK', {
      duration: 3000
    });
  }
}
