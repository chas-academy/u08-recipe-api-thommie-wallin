import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserRecipeListsService } from '../../core/services/user-recipe-lists.service';
import { ListTitle } from '../../shared/interfaces';;

@Component({
  selector: 'app-user-recipe-lists',
  templateUrl: './user-recipe-lists.component.html',
  styleUrls: ['./user-recipe-lists.component.css']
})
export class UserRecipeListsComponent implements OnInit {
  listTitle: ListTitle;
  // createList: Observable<any>;
  errors = null;

  constructor(public userRecipeListsService: UserRecipeListsService) { }

  ngOnInit(): void {
  }

  receiveCreateListData($event) {
    this.listTitle = $event;

    if (this.listTitle) {
      this.userRecipeListsService.storeList(this.listTitle).subscribe(
        result => {
          console.log(result);
        },
        error => {
          this.errors = error.error;
        },() => {
          
        }
      );
    }
  }

}
