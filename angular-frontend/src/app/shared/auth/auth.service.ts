import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces';
import { backend } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = `${backend.backendApiUrl}`;

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
