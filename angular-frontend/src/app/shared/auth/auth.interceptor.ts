import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from "./token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loginToken = this.tokenService.getToken();
    
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + loginToken
      }
    });
    return next.handle(req);
  }
}
