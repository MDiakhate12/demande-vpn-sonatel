import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseURL = "https://demande-vpn-api.herokuapp.com/api/"

  // loginURL = "http://localhost:8000/api/login/";
  loginURL = this.baseURL + "login/";
  // logoutURL = "http://localhost:8000/api/logout/";
  logoutURL = this.baseURL + "logout/";
  // userURL = "http://localhost:8000/api/users/";
  userURL = this.baseURL + "users/";

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + this.getToken()
  })

  redirectURL: string;


  login(user): Observable<any> {
    return this.http.post(this.loginURL, user);
  }

  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }
  logout(): Observable<any> {
    localStorage.clear();
    return this.http.get(this.logoutURL);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserWithId(id: number): Observable<User> {
    let url = this.userURL + id + "/";
    return this.http.get<User>(url, { headers: this.httpHeaders });
  }

  getLoggedUser() {
    let id = parseInt(this.getUserId());
    return this.getUserWithId(id);
  }

  isSecurite() {
    let role = localStorage.getItem('is_securite');
    if(role === 'true') {
      return true
    } else {
      return false
    }
  }

  isAdmin() {
    let role = localStorage.getItem('is_admin');
    if(role === 'true') {
      return true
    } else {
      return false
    }
  }


}
