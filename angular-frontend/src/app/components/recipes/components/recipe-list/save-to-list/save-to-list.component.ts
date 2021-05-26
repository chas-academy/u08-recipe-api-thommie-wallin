import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRecipeListsService } from 'src/app/core/services/user-recipe-lists.service';
import { List } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-save-to-list',
  templateUrl: './save-to-list.component.html',
  styleUrls: ['./save-to-list.component.css']
})
export class SaveToListComponent implements OnInit, OnChanges {
  @Input() recipe;
  userLists: Observable<List[]>;
  error;

  constructor(
    private userRecipeListService: UserRecipeListsService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userRecipeListService.showAllLists();
    this.userLists = this.userRecipeListService.lists;
  }

  ngOnChanges() {
    // console.log(this.recipe);
  }

  addToList(listId, recipe) {
    this.userRecipeListService.storeRecipe(listId, recipe);
    this.userRecipeListService.statusCode.subscribe(code => {
      if (code == 201) {
        this._snackBar.open('Recipe added to list', 'OK', {
          duration: 3000
        });
      } else {
        this._snackBar.open('Recipe already on this list', 'OK', {
          duration: 3000
        });
      }
    });
  }

}
