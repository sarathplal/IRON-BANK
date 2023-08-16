import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import jspdf from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactionArray: any = []
  searchKey: string = ""

  constructor(private api: ApiService, private toaster: ToasterService) {

  }
  ngOnInit(): void {
    this.api.getTransactionHistory().subscribe({
      next: (response: any) => {
        console.log(response);
        this.transactionArray = response
      },
      error: (error: any) => {
        console.log(error);
        this.toaster.showError(error.error, "Fail")
      }
    })
  }
  generatePdf() {
    // 1.create object for jspdf
    let pdf = new jspdf()
    // 2.create title row
    let titleRow = ['Type', 'From Account', 'To Account', 'Amount']
    // table body should be array of array
    let tableBody: any = []

    pdf.setFontSize(16)
    pdf.text("ALL TRANSACTIONS", 50, 10)
    pdf.setFontSize(12)

    // convert Transactions array into array of array ((feature of jspdf))
    for (let element of this.transactionArray) {
      var temp = [element.transaction_Type, element.fromAcno, element.toAcno, element.amount]
      tableBody.push(temp)
    }
    (pdf as any).autoTable(titleRow, tableBody)
    // view in new tab
    pdf.output('dataurlnewwindow')
    // save pdf
    pdf.save('transactions.pdf')
  }

  
}
