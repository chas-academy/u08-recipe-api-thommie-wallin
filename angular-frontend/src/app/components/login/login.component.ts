import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/auth.service';
import { TokenService } from '../../shared/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public token: TokenService,
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
        },
        error => {
          this.errors = error.error;
        },() => {
          // this.authState.setAuthState(true);
          this.loginForm.reset()
          this.router.navigate(['home']);
        }
      );
      // console.log(this.loginForm.value)
  }

  // Handle response
  responseHandler(data){
    this.token.saveToken(data.token);
  }

}
