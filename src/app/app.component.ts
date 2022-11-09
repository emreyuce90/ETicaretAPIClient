import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
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
  constructor(public authService:AuthService,private toasterService:ToastrService,private router:Router){
    this.authService.checkToken();
  }

  logOut(){
    localStorage.removeItem("accessToken");
    this.authService.checkToken();
    this.router.navigate(["/login"]);
    this.toasterService.warning("Oturum kapatıldı","Oturum Kapatıldı",{

      progressBar:true
    });
  }
  
}


