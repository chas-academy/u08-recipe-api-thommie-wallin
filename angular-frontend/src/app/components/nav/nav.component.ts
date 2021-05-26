import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TokenService } from '../../shared/auth/token.service';
import { AuthService } from '../../shared/auth/auth.service';
import { UserRecipeListsService } from 'src/app/core/services/user-recipe-lists.service';

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
    private userRecipeService: UserRecipeListsService,
    private _snackBar: MatSnackBar,
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout().subscribe(
      response => {
        this._snackBar.open(`${response['message']}`, 'OK', {
          duration: 3000
        });
      },
      error => {
        this.errors = error.error;
      },() => {
        
        this.token.removeToken();
        this.userRecipeService.logoutClear();
        this.router.navigate(['home']);
      }
    );
    
  }

}
