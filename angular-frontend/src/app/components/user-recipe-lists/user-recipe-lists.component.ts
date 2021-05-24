import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRecipeListsService } from '../../core/services/user-recipe-lists.service';
import { ListTitle, List } from '../../shared/interfaces';
import { CreateListComponent } from './components/create-list/create-list.component';

@Component({
  selector: 'app-user-recipe-lists',
  templateUrl: './user-recipe-lists.component.html',
  styleUrls: ['./user-recipe-lists.component.css']
})
export class UserRecipeListsComponent implements OnInit {
  listTitle: ListTitle;
  lists: Observable<List[]>;
  listId: number;

  // @ViewChild(CreateListComponent) viewChild: CreateListComponent;

  constructor(
    public userRecipeListsService: UserRecipeListsService,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.lists = this.userRecipeListsService.lists;
    // this.userRecipeListsService.loadAllLists();

    this.userRecipeListsService.showAllLists();
    // this.userRecipeListsService.lists.subscribe(value =>  this.lists = value);
    this.lists = this.userRecipeListsService.lists;


    // console.log(this.lists);
  }

  receiveCreateListData($event) {
    this.listTitle = $event;

    if (this.listTitle) {
      //* FUNGERAR 
      // this.userRecipeListsService.storeList(this.listTitle).subscribe(
      //   result => {
      //     // console.log(result);
          
      //   },
      //   error => {
      //     this.errors = error.error;
      //   },() => {
          
      //   }
      // );

      //* TEST Fungerar!!
      this.userRecipeListsService.storeList(this.listTitle);
      
      this._snackBar.open('List created', 'OK', {
        duration: 3000
      });
      // this.router.navigate(['user-recipe-lists'], {skipLocationChange: true} );
      // this.userRecipeListsService.showAllLists();
      // this.lists = this.userRecipeListsService.lists;
      // this.userRecipeListsService.lists.subscribe(value =>  this.lists = value);
      // console.log(this.lists);
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
    // console.log(this.listId);
  }

}
