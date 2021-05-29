import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRecipeListsService } from 'src/app/core/services/user-recipe-lists.service';
import { List } from '../../../../../shared/interfaces';
import { TokenService } from 'src/app/shared/auth/token.service';

@Component({
  selector: 'app-save-to-list',
  templateUrl: './save-to-list.component.html',
  styleUrls: ['./save-to-list.component.css']
})
export class SaveToListComponent implements OnInit {
  @Input() recipe;
  userLists: Observable<List[]>;
  isLoggedIn: boolean;
  isNotEmpty: boolean;

  constructor(
    private userRecipeListService: UserRecipeListsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.userRecipeListService.showAllLists();
    this.userLists = this.userRecipeListService.lists;
    this.checkListLength();
    this.checkIfToken();
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

  loginRoute($event) {
    if ($event) {
      this.router.navigate(['login']);
    }
  }

  createListRoute($event) {
    if ($event) {
      this.router.navigate(['my-lists']);
    }
  }

  // Login check
  checkIfToken() {
    return this.isLoggedIn = (this.tokenService.getToken()) ? true : false;
  }

  // Check if userlist is an empty array
  checkListLength() {
    this.isNotEmpty;
    this.userLists.subscribe(data => {
      this.isNotEmpty = (data.length > 0) ? true : false;
    }).unsubscribe();

    return this.isNotEmpty;
  }
}
