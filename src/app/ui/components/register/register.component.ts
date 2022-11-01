import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  frm: FormGroup;
  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      adSoyad: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      kullaniciAdi: ["", 
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

  onSubmit(value: User) {
    this.submitted = true;
    debugger;
    var c = this.component;
    if (this.frm.invalid)
      return;
  }

}
