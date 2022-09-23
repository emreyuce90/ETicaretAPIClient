import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListComponent } from 'src/app/admin/components/customers/list/list.component';
import { ProductCreateModel } from 'src/app/contracts/ProductCreateModel';
import { Productlist } from 'src/app/contracts/productlist';
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

  async list(product: Productlist, successCallback?: ()=>void, errorCallback?: (errorMessage:string)=>void) {
    const promiseData :Promise<Productlist[]> = this.httpClientService.get<Productlist[]>({
      controller:"products"
    }).toPromise();

    promiseData.then(d=>successCallback())
    .catch((errorResponse:HttpErrorResponse)=>errorCallback(errorResponse.error))
    return await promiseData;
  }
}
