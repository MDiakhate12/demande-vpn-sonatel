import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  
  constructor(private router: Router, private authService: AuthService) {  }


  canActivate(): boolean {
    return this.checkRole();
  }

  checkRole() {
    if(this.authService.isAdmin() === true) {
      return true;  
    }
    this.router.navigate(['/dashboard']);
    return false;
  }

}

