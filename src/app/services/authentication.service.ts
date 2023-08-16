import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  // chcek weather the user is logged in or not
  isLoggedIn(){
    return !!localStorage.getItem("token")
  }

}
