import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { CustomerService } from '../../../../common/models/customer.service';
import { CustomerCreateModel } from '../../../../contracts/customer-create-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyOptions, AlertifyService, MessagePosition, MessageType } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private customerService: CustomerService, spinner: NgxSpinnerService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }
@Output() createdCustomer :EventEmitter<CustomerCreateModel> = new EventEmitter();
  createCustomer(txtName: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallTrianglePath);
    const model: CustomerCreateModel = new CustomerCreateModel();
    model.name = txtName.value;
    this.customerService.create(model, () => {
      this.hideSpinner(SpinnerType.BallTrianglePath)
      this.alertifyService.message("Müşteri ekleme işlemi başarılı", { messageType: MessageType.Success, position: MessagePosition.ÜstSağ })
    });
    this.createdCustomer.emit(model);
  }

}
