import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuriteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(): boolean {
    return this.checkRole();
  }

  checkRole() {
    if(this.authService.isSecurite() === true) {
      return true;  
    }
    this.router.navigate(['/dashboard']);
    return false;
  }

}
