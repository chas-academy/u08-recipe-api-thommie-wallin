import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { CoreModule } from '../core.module';
import { ListTitle, List } from '../../shared/interfaces';
import { TokenService } from '../../shared/auth/token.service';

@Injectable({
  providedIn: CoreModule,
})
export class UserRecipeListsService {
  private baseUrl: string = `http://u08.test/api/`;
  private _lists = new BehaviorSubject<List[]>([]);
  // private dataStore: { lists: List[] } = { lists: [] }; // store our data in memory
  readonly lists = this._lists.asObservable();

  constructor(
    private http: HttpClient,
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

}
