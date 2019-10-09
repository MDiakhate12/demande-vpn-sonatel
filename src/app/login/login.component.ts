import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: '#app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input = {};

  hide:boolean=false;
  username = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  credentials: boolean;
  input_username:string;
  input_password:string;

  @ViewChild('alert', { static: false }) alert;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }


  ngOnInit() { }

  
  onLogin() {
    if (this.username.valid && this.password.valid) {
      let user = {username: this.input_username, password: this.input_password};
      console.log(user)
      this.authService.login(user)
        .subscribe(
          async response => {
            console.log(response);
            for (let [key, value] of Object.entries(response)) {
              localStorage.setItem(key, (value as string));
              await this.router.navigate(['/dashboard']).then(() => {
                window.location.reload();
              });
            }

          },
          error => {
            this.credentials = false;
            console.log(this.authService);
            console.log('error', error);
            console.log("Wrong credentials !");
          }
        );
    }

  };

  getRequiredErrorMessage() {
    if (this.username.hasError('required') || this.password.hasError('required')) {
      return "Ce champs est obligatoire";
    }
  }

  getCredentialsErrorMessage() {
    return "Nom d'utilisateur ou mot de passe incorrect";
  }

  close(alert) {
    console.log(alert)
    this.alert.alert('close');
  }
}
