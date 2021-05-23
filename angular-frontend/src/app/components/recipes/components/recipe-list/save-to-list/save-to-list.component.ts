import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

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
  ) { }

  ngOnInit(): void {
    this.userRecipeListService.showAllLists();
    this.userLists = this.userRecipeListService.lists;

    if (this.userLists) {
      
    }
  }

  ngOnChanges() {
    // console.log(this.recipe);
  }

  addToList(listId, recipe) {
    console.log(listId, recipe);
    this.error = this.userRecipeListService.storeRecipe(listId, recipe);
    // if (this.error) {
    //   console.log(this.error)
    // }

  }

}
