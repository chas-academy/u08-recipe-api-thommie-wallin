import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from "./token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loginToken = this.tokenService.getToken();

    // const authReq = req.clone({ setHeaders: { Authorization: loginToken } });
    // console.log(authReq);

    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', loginToken)
    // });
    
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + loginToken
      }
    });
    return next.handle(req);
  }
}
