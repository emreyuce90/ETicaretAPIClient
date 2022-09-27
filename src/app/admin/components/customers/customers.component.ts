import { APP_ID, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from './list/list.component';
import { ThisReceiver } from '@angular/compiler';
import { CustomerCreateModel } from 'src/app/contracts/customer-create-model';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallTrianglePath);
  }
  @ViewChild(ListComponent) listComponent: ListComponent;
  createdCustomer(createdCustomer:CustomerCreateModel) {
    this.listComponent.listCustomer();
  }
}
