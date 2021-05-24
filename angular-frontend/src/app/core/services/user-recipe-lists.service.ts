import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, AsyncSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { CoreModule } from '../core.module';
import { ListTitle, List } from '../../shared/interfaces';
import { Recipe } from '../../shared/models/recipe.model';
import { TokenService } from '../../shared/auth/token.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: CoreModule,
})
export class UserRecipeListsService {
  private baseUrl: string = `http://u08.test/api/`;
  private _lists = new BehaviorSubject<List[]>([]);
  // private dataStore: { lists: List[] } = { lists: [] }; // store our data in memory
  readonly lists = this._lists.asObservable();

  //? Replaysubject eller subject istället för behavioursubject?
  private _list = new Subject<List>();
  readonly list = this._list.asObservable();

  private _recipes = new BehaviorSubject<any>([]);
  readonly recipes = this._recipes.asObservable();
  

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    // public token: TokenService,
  ) { }

  // get allLists() {
  //   return this._lists.asObservable();
  // }

  // loadAllLists() {
  //   this.http.get<List[]>(`${this.baseUrl}userlist`).subscribe(
  //     data => {
        
  //       this.dataStore.lists = data;
  //       this._lists.next(Object.assign({}, this.dataStore).lists); // Push a new copy of our lists to all Subscribers.
  //       // console.log(this._lists);
  //     },
  //     error => console.log('Could not load lists.')
  //   );
  // }

  showAllLists() {
    return this.http.get<List[]>(`${this.baseUrl}userlist`).subscribe(
      data => {  
        // Push a new copy of the lists to all Subscribers.
        this._lists.next(data);
      },
      error => console.log('Could not load lists.')
    );
  }

  showList(listId) {
    return this.http.get<List>(`${this.baseUrl}userlist/${listId}`).subscribe(
      data => {  
        
        this._list.next(data);
        // this.list.subscribe(data1 => console.log(data1));
        // console.log(data);
      },
      error => console.log('Could not load this list.')
    );
  }

  showRecipes(listId) {
    return this.http.get<any>(`${this.baseUrl}recipe/${listId}`).subscribe(
      data => {  
        // let latestList = data;

        // data = this.recipes;
        this._recipes.next(data);
        // console.log(this.recipes);
        // latestList.foreach(recipe_nr => {
        //   console.log(recipe_nr);

        //   // this.dataService.getRecipe(recipe_nr).subscribe(
        //   //   data => {
        //   //     // this.recipes += data
        //   //     // this.recipes.push(data);
        //   //     console.log(this.recipes);
        //   //   }
            
        //   // );
        // })
        
        // console.log(data);
      },
      error => console.log('Could not load this list.')
    );
  }

  //* FUNGERAR 
  // storeList(title: ListTitle): Observable<any> {
  //   return this.http.post<ListTitle>(`${this.baseUrl}userlist`, title);
  // }

  
  //* TEST Fungerar 
  storeList(title: ListTitle) {
    this.http.post<any>(`${this.baseUrl}userlist`, title)
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
        error => console.log('Could not create list.')
      );
  }

  deleteList(listId) {
    this.http.delete<any>(`${this.baseUrl}userlist/${listId}`)
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
    this.http.post<any>(`${this.baseUrl}recipe/${listId}`, recipe)
      .subscribe(
        data => {
          // console.log(data);
        },
        error => console.log(error.error.text)
        
      );
  }

  deleteRecipe(recipeId, userListId) {
    this.http.delete<any>(`${this.baseUrl}recipe/${recipeId}/fromlist/${userListId}`)
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

}
