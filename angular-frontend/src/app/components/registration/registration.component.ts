import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      name: '',
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.emailValidation() && this.passwordValidation()) {
      this.authService.register(this.registerForm.value).subscribe(
        result => {
          if (result == 201) {
            this._snackBar.open('User created', 'OK', {
              duration: 3000
            });
          }
        },
        error => {
          if (error.status == 422) {
              // If both fields are empty
              if (Object.keys(error.error.errors).length > 2) {
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
              } else if (error.error.errors.name) {
                this._snackBar.open(`${error.error.errors.name[0]}`, 'OK', {
                  duration: 3000
                });
              }
            }

            if (error.status == 401) {
              this._snackBar.open(`${error.error.message}`, 'OK', {
                duration: 3000
              });
            }
        },
        () => {
          this.registerForm.reset()
          this.router.navigate(['login']);
        }
      )
    } else {
      this._snackBar.open(`Invalid email or password required`, 'OK', {
        duration: 3000
      });
    }
    
    
  }

  emailValidation() {
    return this.registerForm.get('email').valid;
  }

  passwordValidation() {
    return this.registerForm.get('password').valid;
  }
}
