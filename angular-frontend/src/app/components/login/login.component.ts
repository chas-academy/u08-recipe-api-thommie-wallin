import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../shared/auth/auth.service';
import { TokenService } from '../../shared/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public token: TokenService,
    private _snackBar: MatSnackBar,
  ) { 
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
      this.authService.login(this.loginForm.value).subscribe(
        result => {
          this.responseHandler(result);
          this._snackBar.open('Login successful', 'OK', {
            duration: 3000
          });
        },
        error => {
          if (error.status == 422) {
            // If both fields are empty
            if (Object.keys(error.error.errors).length > 1) {
              this._snackBar.open(`${error.error.message}`, 'OK', {
                duration: 3000
              });
              // If email field is empty
            } else if (error.error.errors.email) {
              this._snackBar.open(`${error.error.errors.email[0]}`, 'OK', {
                duration: 3000
              });
              // If password field is empty
            } else if (error.error.errors.password) {
              this._snackBar.open(`${error.error.errors.password[0]}`, 'OK', {
                duration: 3000
              });
            }
          }

          if (error.status == 401) {
            this._snackBar.open(`${error.error.message}`, 'OK', {
              duration: 3000
            });
          }
        },() => {
          this.loginForm.reset()
          this.router.navigate(['home']);
        }
      );
  }

  // Save token in local storage
  responseHandler(data){
    this.token.saveToken(data.token);
  }
}
