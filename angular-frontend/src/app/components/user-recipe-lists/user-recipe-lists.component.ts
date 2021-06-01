import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRecipeListsService } from '../../core/services/user-recipe-lists.service';
import { ListTitle, List } from '../../shared/interfaces';
import { TokenService } from 'src/app/shared/auth/token.service';

@Component({
  selector: 'app-user-recipe-lists',
  templateUrl: './user-recipe-lists.component.html',
  styleUrls: ['./user-recipe-lists.component.css']
})
export class UserRecipeListsComponent implements OnInit {
  listTitle: ListTitle;
  lists: Observable<List[]>;
  listId: number;
  error;
  isLoggedIn: boolean;
  
  constructor(
    public userRecipeListsService: UserRecipeListsService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.checkIfToken();
    if (this.isLoggedIn) {
      this.userRecipeListsService.showAllLists();
    }
    this.lists = this.userRecipeListsService.lists;
    this.notLoggedIn();
  }

  receiveCreateListData($event) {
    this.listTitle = $event;

    // Check if field empty
    if (this.listTitle.title === "" || this.listTitle.title === null) {
    this.userRecipeListsService.storeList(this.listTitle);
    this.userRecipeListsService.error.subscribe(error => {
      if (error.status == 422) {
        this._snackBar.open(`${error.error.errors['title'][0]}`, 'OK', {
          duration: 3000
        });
      }

      if (error.status == 401) {
        this._snackBar.open(`${error.error.message}`, 'OK', {
          duration: 3000
        });
      }
    })
  } else {
    if (this.isLoggedIn) {
      this.userRecipeListsService.storeList(this.listTitle);
      this._snackBar.open('List created', 'OK', {
        duration: 3000
      });
    }
  }
}

  receiveReadAllListData($event) {
    this.listId = $event;

    if (this.listId) {
      this.userRecipeListsService.deleteList(this.listId);
      this._snackBar.open('List deleted', 'OK', {
        duration: 3000
      });
    }
  }

  // Error msg when not logged in
  notLoggedIn() {
    this.error = this.userRecipeListsService.statusCode;
    this.error.subscribe(data => {
      this._snackBar.open(`${data}`, 'OK', {
        duration: 3000
      });
    })
  }

  // Login check
  checkIfToken() {
    return this.isLoggedIn = (this.tokenService.getToken()) ? true : false;
  }
}
