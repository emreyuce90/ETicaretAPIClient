import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/common/http-client.service';
import { ProductCreateModel } from 'src/app/contracts/ProductCreateModel';
import { ListProductComponent } from './list-product/list-product.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallTrianglePath);
  }

  @ViewChild(ListProductComponent) listProducts:ListProductComponent;

   createdProduct(createdProduct:ProductCreateModel){
     this.listProducts.listProduct();
  }
}