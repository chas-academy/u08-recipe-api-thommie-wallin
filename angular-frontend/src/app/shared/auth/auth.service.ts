import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../interfaces';
import { TokenService } from '../../shared/auth/token.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Accept: 'application/json',
//     'Content-Type':  'application/json',
//   }),
//   withCredentials: true
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    // public token: TokenService,
  ) { }

  // getCookie() {
  //   return this.http.get<any>('http://u08.test/sanctum/csrf-cookie');
  // }

  register(user: User): Observable<any> {
    return this.http.post<any>('http://u08.test/api/register', user);
  }
  
  login(user: User): Observable<any> {
    return this.http.post<any>('http://u08.test/api/login', user);
  }

  logout() {
    return this.http.post('http://u08.test/api/logout', null);
  }
}
