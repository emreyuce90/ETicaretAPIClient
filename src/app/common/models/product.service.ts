import { Injectable } from '@angular/core';
import { ProductCreateModel } from 'src/app/contracts/ProductCreateModel';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: ProductCreateModel,successCallback:any) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result=>successCallback());
  }
}
