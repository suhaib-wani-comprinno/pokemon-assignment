import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService : AuthService, private route:Router){}

  loadable : boolean = false;

  isLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn')as string);

  canLoad(): boolean {
    this.loadable = this.authService.isLoggedIn;
    if (this.loadable) {
      return true
    } else {
      alert('You have to log in first')
      this.route.navigateByUrl('/')
      return false
    }
  }
}
