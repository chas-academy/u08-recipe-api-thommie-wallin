import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token) {
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  removeToken(){
    localStorage.removeItem('auth_token');
  }
}
