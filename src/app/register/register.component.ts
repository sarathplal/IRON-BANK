import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // form-group

  registerForm = this.FormBuilder.group({
    // all the html inputs should be declared here
    userName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
    accNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
    passWord: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]],

    // cPassWord:['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private FormBuilder: FormBuilder, private api: ApiService, private toster: ToastrService, private joinRouter: Router) {

  }


  register() {

    // just checked to console the result

    // if (this.registerForm.get('userName')?.errors) {
    //   console.log(this.registerForm.get('userName')?.errors);

    // } else console.log(this.registerForm.get('userName')?.errors);


    if (this.registerForm.valid) {

      let username = this.registerForm.value.userName
      let accountNumber = this.registerForm.value.accNumber
      let password = this.registerForm.value.passWord


      this.api.register(username, accountNumber, password).subscribe({

        next: (response: any) => {
          this.toster.success(`${response.username} successfully registered`, 'Success')
          setTimeout(() => {
            // navigate to login page
            this.joinRouter.navigateByUrl('/login')
          }, 2000)

        },
        error: (err: any) => {
          console.log(err);
          this.toster.error(`${err.message}`, 'Fail')

        }
      })

    } else {
      this.toster.warning("Invalid Form", 'Warning')
    }

    //  
    //  alert(username)
  }


}
