import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrNotificationService, ToastrOpt } from './services/ui/toastr-notification.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ETicaretAPIClient';
  // constructor(private toastr:ToastrNotificationService){
  //   toastr.showToastrMessage("Test","LoremIpsum",ToastrOpt.Success);

  // }
  constructor(){}
}
// $.ajax({
//   method:"get",
//   url:"https://localhost:7021/api/products",
//   success:function(data){
//     console.log(data)
//   }
// })

