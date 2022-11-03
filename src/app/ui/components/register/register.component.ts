import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/common/models/users.service';
import { UserCreate } from 'src/app/contracts/user_create';
import { User } from 'src/app/entity/user';
import { ToastrNotificationService, ToastrOpt } from 'src/app/services/ui/toastr-notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private notify: ToastrNotificationService, private userService: UsersService) { }
  frm: FormGroup;
  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      username: ["",
        [Validators.required,
        Validators.min(3),
        Validators.max(50)
        ]],
      email: ["",
        [Validators.email,
        Validators.required
        ]],
      password: ["", [
        Validators.required,

      ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    })
  }


  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid)
      return;
    //post method 
  
    const data: UserCreate = await this.userService.createUser(user);
    if(data.isSucceeded)
      this.notify.showToastrMessage("İşlem Başarılı", data.message, ToastrOpt.Success);
    else
      this.notify.showToastrMessage("Hata", data.message, ToastrOpt.Error);

  }

}
