import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers: new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  base_url = 'http://localhost:3000'

  constructor(private http: HttpClient,) { }

  //register api
  register(username: any, acno: any, password: any) {

    // reg body
    const body = {
      username,
      acno,
      password
    }

    // to call register api 

    return this.http.post(`${this.base_url}/users/register`, body)

  }

  // login api
  login(acno: any, password: any) {
    const body = {
      acno,
      password
    }
    // api call
    return this.http.post(`${this.base_url}/users/login`, body)
  }

  // adding Header to http request
  appendToken() {
    const token = localStorage.getItem("token")
    // create http header 
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('access-token', token)
      options.headers = headers
    }
    return options
  }


  // balance enquiry
  balanceEnquiry(acno: any) {

    // make api call to server
    return this.http.get(`${this.base_url}/user/balance/${acno}`, this.appendToken())

  }

  // fund transfer

  fundTransfer(creditAcno: any, creditAmount: any, password: any) {

    // create request body

    const body = {
      creditAcno,
      creditAmount,
      password
    }

    // make api call
    return this.http.post(`${this.base_url}/users/transfer`, body, this.appendToken())
  }

  // Transaction History

  getTransactionHistory() {
    return this.http.get(`${this.base_url}/user/ministatement`, this.appendToken())
  }

  // Delete account
  deleteAccount() {

    return this.http.delete(`${this.base_url}/user/delete`, this.appendToken())
  }

}
