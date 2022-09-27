import { BaseCdkCell } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CustomerService } from 'src/app/common/models/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { CustomerListWCount } from 'src/app/contracts/customer-list-wcount';
import { Customer } from 'src/app/contracts/customer';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  constructor(private customerService: CustomerService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }
  displayedColumns: string[] = ['name'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>(null);

  async ngOnInit() {
   await this.listCustomer();
  }
  async pageclick() {
    await this.listCustomer();
  }

  async listCustomer() {
    this.showSpinner(SpinnerType.BallTrianglePath);
    const data: CustomerListWCount = await this.customerService.getList(this.paginator ? this.paginator.pageIndex :0, this.paginator ? this.paginator.pageSize:5, () => this.hideSpinner(SpinnerType.BallTrianglePath), errorMessage => this.alertify.message(errorMessage, { messageType: MessageType.Error, position: MessagePosition.ÜstSağ }))
    this.dataSource = new MatTableDataSource<Customer>(data.customer);
    this.paginator.length=data.totalCustomer;

  }

}
