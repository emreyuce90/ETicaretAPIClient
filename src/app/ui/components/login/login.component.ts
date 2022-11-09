import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UsersService } from 'src/app/common/models/users.service';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UsersService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    super(spinner)
  }

  ngOnInit(): void {

  }

  async login(username: string, password: string) {
    this.showSpinner(SpinnerType.BallTrianglePath);
    await this.userService.login(username, password, () => {
      this.authService.checkToken()

      //returnUrl var mı?
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      });


    });
  }

}
