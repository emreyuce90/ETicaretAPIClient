import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { _isAuthenticated } from 'src/app/services/common/auth.service';

@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router,private toastrService:ToastrService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   

    if (!_isAuthenticated) {
      //token sona erdiyse veya token yoksa
      this.router.navigate(["/login"],{
        queryParams:{returnUrl:state.url}
        //kullanıcıyı giriş yapması için bilgilendir
        
      });
      this.toastrService.warning("Lütfen giriş yapınız","Uyarı!",{
        progressBar:true
      })
    }
    return true;
  }

}
