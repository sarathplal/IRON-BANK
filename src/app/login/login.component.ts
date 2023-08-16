import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading = false

  loginForm = this.formBuilder.group({
    accNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
    passWord: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]],
  })

  constructor(private formBuilder: FormBuilder, private api: ApiService, private toaster: ToasterService, private loginTransit: Router) {

  }

  login() {

    if (this.loginForm.valid) {

      this.isLoading = true
      // form validation
      // get inputs

      let acno = this.loginForm.value.accNumber
      let pswd = this.loginForm.value.passWord

      // login api call in servie

      this.api.login(acno, pswd).subscribe({
        next: (res: any) => {


          // restructure response
          const { preuser, token } = res
          // we have to store username in local
          localStorage.setItem("loginUsername", preuser.username)
          // store acno to local storage
          localStorage.setItem("currentUserAccountNumber", preuser.acno)
          // store token in localstorage
          localStorage.setItem("token", token)


          setTimeout(() => {
            this.isLoading = false
            this.loginTransit.navigateByUrl('user/dashboard');
            this.toaster.showSuccess(`${preuser.username} successfully logged in `, 'Success')
          }, 2000)

        },
        error: (err: any) => {

          this.toaster.showError(`Enter valid username and password `, 'Fail')

        }
      })

    } else {
      this.toaster.showWarning(`Invalid Form `, 'Warning')
    }
  }

}
