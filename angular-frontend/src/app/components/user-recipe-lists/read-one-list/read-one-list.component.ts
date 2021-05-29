import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRecipeListsService } from '../../../core/services/user-recipe-lists.service';
import { List } from '../../../shared/interfaces';

@Component({
  selector: 'app-read-one-list',
  templateUrl: './read-one-list.component.html',
  styleUrls: ['./read-one-list.component.css']
})
export class ReadOneListComponent implements OnInit {
  listId: string;
  list: Observable<List>;
  recipes: Observable<List[]>;
  

  constructor(
    private route: ActivatedRoute,
    public userRecipeListsService: UserRecipeListsService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.showList();
    this.showRecipes();
  }

  showList(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.userRecipeListsService.showList(this.listId);
    this.list = this.userRecipeListsService.list;
  }

  showRecipes(): void {
    // Get recipes from database
    this.listId = this.route.snapshot.paramMap.get('id');
    this.userRecipeListsService.showRecipes(this.listId);
    this.recipes = this.userRecipeListsService.recipes;
  }

  deleteOneRecipe(recipeId): void {
    this.userRecipeListsService.deleteRecipe(recipeId, parseInt(this.listId));
    this._snackBar.open('Recipe deleted', 'OK', {
      duration: 3000
    });
  }

}
