import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CoreModule } from '../core.module';
import { ListTitle, List } from '../../shared/interfaces';

@Injectable({
  providedIn: CoreModule,
})

export class UserRecipeListsService {
  private baseUrl: string = `http://u08.test/api`;

  private _lists = new BehaviorSubject<List[]>([]);
  readonly lists = this._lists.asObservable();

  private _list = new Subject<List>();
  readonly list = this._list.asObservable();

  private _recipes = new BehaviorSubject<any>([]);
  readonly recipes = this._recipes.asObservable();

  private _statusCode = new Subject();
  readonly statusCode = this._statusCode.asObservable();

  private _error = new Subject<HttpErrorResponse>();
  readonly error = this._error.asObservable();
  

  constructor(
    private http: HttpClient,
  ) { }

  showAllLists() {
    return this.http.get<List[]>(`${this.baseUrl}/userlist`).subscribe(
      data => {  
        // Push a new copy of the lists to all Subscribers.
        this._lists.next(data);
      },
      error => this._statusCode.next('Could not load lists.')
    );
  }

  showList(listId) {
    return this.http.get<List>(`${this.baseUrl}/userlist/${listId}`).subscribe(
      data => {
        this._list.next(data);
      },
      error => console.log('Could not load this list.')
    );
  }

  showRecipes(listId) {
    return this.http.get<any>(`${this.baseUrl}/recipe/${listId}`).subscribe(
      data => {
        this._recipes.next(data);
      },
      error => console.log('Could not load this list.')
    );
  }

  storeList(title: ListTitle) {
    this.http.post<any>(`${this.baseUrl}/userlist`, title)
      .subscribe(
        data => {
          let latestList: List[] = [];

          // Get latest list and add created list
          this.lists.subscribe(value => {
            value.push(data), 
            latestList = value
          }).unsubscribe();
          
          // Push a new copy of the lists to all Subscribers.
          this._lists.next(latestList);
        },
        error => this._error.next(error)
      );
  }

  deleteList(listId) {
    this.http.delete<any>(`${this.baseUrl}/userlist/${listId}`)
      .subscribe(
        data => {
          let latestList: List[] = [];
          let indexNr: number = 0;
          
          // Get latest list of lists from observer and delete list with this id.
          this.lists.subscribe(value => {
            indexNr = value.findIndex(recipe => recipe.id == data.id);

            if (indexNr !== -1) {
              value.splice(indexNr, 1);
              latestList = value
            }
          }).unsubscribe();
          
          // Push a new copy of the lists to all Subscribers.
          this._lists.next(latestList);
        },
        error => console.log('Could not delete list.')
      );
  }

  storeRecipe(listId, recipe) {
    this.http.post<any>(`${this.baseUrl}/recipe/${listId}`, recipe)
      .subscribe(
        data => {
          if (data) {
            this._statusCode.next(data);
          }
        },
        error => console.log(error.error.text)
      );
  }

  deleteRecipe(recipeId, userListId) {
    this.http.delete<any>(`${this.baseUrl}/recipe/${recipeId}/fromlist/${userListId}`)
      .subscribe(
        data => {
          let latestList: List[] = [];
          let indexNr: number = 0;
          
          // Get latest list of recipes from observer and delete the recipe from the list.
          this.recipes.subscribe(value => {  
            indexNr = value.findIndex(recipe => recipe.id == data.id);

            if (indexNr !== -1) {
              value.splice(indexNr, 1);
              latestList = value
            }
          }).unsubscribe();
          
          // Push a new copy of the lists to all Subscribers.
          this._recipes.next(latestList);
        },
        error => console.log(error.error.text)
      );
  }

  // Clear recipes from _recipes-behavioursubject
  clearList() {
    this._recipes.next([]);
  }

  logoutClear() {
    this._lists.next([]);
    this._list.next(null);
    this._recipes.next([]);
  }
}
