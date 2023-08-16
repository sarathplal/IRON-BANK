import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toster: ToastrService) { 

   
  }

  showSuccess(msg:any,title:any){
    this.toster.success(msg,title)
  }
  showError(msg:any,title:any){
    this.toster.error(msg,title)
  }
  showWarning(msg:any,title:any){
    this.toster.warning(msg,title)
  }


}
