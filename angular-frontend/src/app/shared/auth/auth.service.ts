import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = `http://u08.test/api`;

  constructor(
    private http: HttpClient,
  ) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
  
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, null);
  }
}
