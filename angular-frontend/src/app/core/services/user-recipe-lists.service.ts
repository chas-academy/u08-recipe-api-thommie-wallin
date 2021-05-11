import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CoreModule } from '../core.module';
import { ListTitle } from '../../shared/interfaces';
import { TokenService } from '../../shared/auth/token.service';

@Injectable({
  providedIn: CoreModule,
})
export class UserRecipeListsService {
  baseUrl: string = `http://u08.test/api/`;

  constructor(
    private http: HttpClient,
    // public token: TokenService,
  ) { }

  storeList(title: ListTitle): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}userlist`, title);
    
    // return this.http.post<any>('http://u08.test/api/userlist', title);
  }
}
