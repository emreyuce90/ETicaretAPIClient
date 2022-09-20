import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/common/http-client.service';

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

    // this.httpClientService.post({
    //   controller:"products",
    // },{
    //   name:"Kalem",
    //   price:15,
    //   stock:46
    // }).subscribe();

    // this.httpClientService.put({controller:"products"},{
    //   id:"d29bc2b9-6467-4652-d5b8-08da9b0227d0",
    //   name:"Merhaba Dünya",
    //   Stock:10000
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // },"d29bc2b9-6467-4652-d5b8-08da9b0227d0").subscribe();

  }
}