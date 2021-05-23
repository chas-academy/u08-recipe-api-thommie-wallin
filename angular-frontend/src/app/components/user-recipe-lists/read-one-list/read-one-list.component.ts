import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  results;
  

  constructor(
    private route: ActivatedRoute,
    public userRecipeListsService: UserRecipeListsService,
  ) { }

  ngOnInit(): void {
    this.showList();
    this.showRecipes();
    // console.log(this.list);
  }

  showList(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.userRecipeListsService.showList(this.listId);
    // this.userRecipeListsService.list.subscribe(data => 
    //   // data = this.listTitle
    //   console.log(data)
    // );
    this.list = this.userRecipeListsService.list;
    // console.log(this.list);
  }

  showRecipes(): void {
    // Get recipes from database
    this.listId = this.route.snapshot.paramMap.get('id');
    this.userRecipeListsService.showRecipes(this.listId);
    this.results = this.userRecipeListsService.recipes;
    // console.log(this.results);
  }

}
