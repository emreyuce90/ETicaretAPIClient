import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { ProductListWCount } from 'src/app/contracts/product-list-wcount';
import { ProductlistViewModel } from 'src/app/contracts/productlistviewmodel';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'modifiedDate'];
  dataSource: MatTableDataSource<ProductlistViewModel> = null;
  /*
 Sayfa ilk yüklendiğinde spinnerı aktif et ,başarılı olma durumunda spinnerı gizle,hata durumunda alrtifyla error mesajı bas,gelen datayı matTableData source türünden karşıla ve await ile beklenilen datayı data source a ver 
  */
  async listProduct() {
    this.showSpinner(SpinnerType.BallTrianglePath);
    const allProducts:ProductListWCount = await this.productService.list(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallTrianglePath), errorMessage => this.alertify.message(errorMessage, {
      messageType: MessageType.Error,
      position: MessagePosition.ÜstSağ
    }))
    this.dataSource = new MatTableDataSource<ProductlistViewModel>(allProducts.productListViewModel);

    this.paginator.length =allProducts.totalCount;

  }
  async pageChanged() {
    this.listProduct()
  }

  async ngOnInit() {
    this.listProduct();
  }

}

