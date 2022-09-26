import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListComponent } from 'src/app/admin/components/customers/list/list.component';
import { ProductListWCount } from 'src/app/contracts/product-list-wcount';
import { ProductCreateModel } from 'src/app/contracts/ProductCreateModel';

import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: ProductCreateModel, successCallback: any) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => successCallback())
  };


/*Bize eğer liste gelirse listeyi return edicez, eğer liste gelmezse hata mesajını göndericez*/

  async list(pageNumber:number,pageSize:number ,successCallback?: ()=>void, errorCallback?: (errorMessage:string)=>void) {
    const promiseData :Promise<ProductListWCount> = this.httpClientService.get<ProductListWCount>({
      controller:"products",
      queryString:`pageNumber=${pageNumber}&pageSize=${pageSize}` 
    }).toPromise();

    promiseData.then(d=>successCallback())
    .catch((errorResponse:HttpErrorResponse)=>errorCallback(errorResponse.error))
    return await promiseData;
  }
}
