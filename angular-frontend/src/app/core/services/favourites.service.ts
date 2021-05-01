import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class FavouritesService {
  favouritesList = [];

  addToFavourites(recipe) {
    this.favouritesList.push(recipe);
  }

  getFavourites() {
    return this.favouritesList;
  }

  clearAllFavourites() {
    this.favouritesList = [];
    return this.favouritesList;
  }

  clearOneFavourite(recipe) {
    const recipeId = recipe.id;
    const indexNr = this.favouritesList.findIndex(recipe => recipe.id === recipeId);
    
    if (indexNr !== -1) {
      this.favouritesList.splice(indexNr, 1);
    }
  }

  constructor() { }
}
