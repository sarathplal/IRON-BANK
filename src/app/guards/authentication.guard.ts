import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(private authService: AuthenticationService, private router: Router) {

  }

  canActivate: CanActivateFn = () => {


    if (this.authService.isLoggedIn()) {
      return true
    } else {
      alert("please Login")
      this.router.navigateByUrl("")
      return false
    }


  }

}
