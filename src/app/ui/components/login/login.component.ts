import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UsersService } from 'src/app/common/models/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UsersService,spinner:NgxSpinnerService) {
super(spinner)
  }

  ngOnInit(): void {

  }

  async login(username: string, password: string) {
  this.showSpinner(SpinnerType.BallTrianglePath);
   await this.userService.login(username,password,()=>this.hideSpinner(SpinnerType.BallTrianglePath));
  }

}
