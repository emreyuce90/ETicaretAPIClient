import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) {

  }

  showToastrMessage(title:string,description:string,opt:ToastrOpt){
    this.toastr[opt](title,description);
  }


}

export enum ToastrOpt{
  Success="success",
  Info="info",
  Warning="warning",
  Error="error"
}

export enum toastrPos{
TopRight="toast-top-right",
BottomRight="toast-bottom-right",
BottomLeft="toast-bottom-left",
TopLeft="toast-top-left",
TopFullWidth="toast-top-full-width",
BottomFullWidth="toast-top-bottom-full-width",
TopCenter="toast-top-center",
BottomCenter="toast-bottom-center",
}
