import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  handleTransfer: boolean = true
  accBalance: number = 0
  showOffcanvas: boolean = true
  transactionSuccessful: string = ""
  transactionFail: string = ""


  fundTransferForm = this.formGroup.group({
    creditAcno: ["", [Validators.required, Validators.pattern("[0-9]*")]],
    creditAmount: ["", [Validators.required, Validators.pattern("[0-9]*")]],
    profilePswd: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
  })

  userName: string = ""
  constructor(private api: ApiService, private toaster: ToasterService, private formGroup: FormBuilder, private dashboardRouter: Router) {

  }
  ngOnInit(): void {
    // get login user name from local storage and assign it to calss proprty
    this.userName = localStorage.getItem("loginUsername") || ""
  }

  getBalance() {
    // get currentUserAccountNumber from local storage
    let acno = localStorage.getItem("currentUserAccountNumber")
    console.log(acno);

    // api call to service
    return this.api.balanceEnquiry(acno).subscribe({
      next: (res: any) => {
        console.log(res);
        this.accBalance = res
      },
      error: (err) => {
        console.log(err);
        this.toaster.showError(err.error, "Fail")
      }
    })
  }

  // transfer function
  fundTransfer() {

    if (this.fundTransferForm.valid) {

      // get values from form
      let creditAcno = this.fundTransferForm.value.creditAcno
      let creditAmount = this.fundTransferForm.value.creditAmount
      let profilePswd = this.fundTransferForm.value.profilePswd

      // make api call to service
      this.api.fundTransfer(creditAcno, creditAmount, profilePswd).subscribe({
        next: (res: any) => {

          console.log(res);
          this.transactionSuccessful = res
          this.handleTransfer = false
          setTimeout(() => {
            this.transactionSuccessful = ""
            this.handleTransfer = true
            this.fundTransferForm.reset()
          }, 5000)
        },
        error: (err) => {

          this.transactionFail = err.error
          this.handleTransfer = false

          setTimeout(() => {

            this.transactionFail = ""
            this.handleTransfer = true
            this.fundTransferForm.reset()
          }, 5000)
        }

      })

    } else {
      this.toaster.showWarning("Invalid Form", "warning")
    }
  }

  // cancel Fundtransfer function
  cancelFundTransfer() {

    this.fundTransferForm.reset()
    this.transactionSuccessful = ""
    this.transactionFail = ""
  }

  // Delete Account
  deleteMyaccount() {

    this.api.deleteAccount().subscribe({
      next: (res: any) => {
        console.log(res);
        this.toaster.showWarning(res, "Warning")
        this.logout()
      },
      error: (err: any) => {
        console.log(err);


      }
    })
  }

  // Logout
  logout() {
    // remove form local storage
    localStorage.removeItem("loginUsername")
    localStorage.removeItem("currentUserAccountNumber")
    localStorage.removeItem("token")
    this.toaster.showSuccess("Logged out", "Success")

    setTimeout(() => {
      this.dashboardRouter.navigateByUrl("")
    }, 200);
  }

}
