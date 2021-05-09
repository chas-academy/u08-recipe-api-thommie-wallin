import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TokenService } from '../../shared/auth/token.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  errors = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout().subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.errors = error.error;
      },() => {
        
        this.token.removeToken();
        this.router.navigate(['home']);
      }
    );
    
  }

}
