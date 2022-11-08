import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService) { }

  checkToken(){
    const token: string = localStorage.getItem("accessToken");
    let isExpired: boolean;
    try {
      //isExpired a atama yapmaya çalış eğer atama yapılırsa token false ya da true döner
      isExpired = this.jwtHelper.isTokenExpired(token);
    } catch {
      //eğer geçerli bir token değilse expired ına true veririz ki geçersiz olsun
      isExpired = true;
    }
    //duruma göre true ya da false değerini alır
    _isAuthenticated =!isExpired && token!=null;

    
  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated:boolean;

