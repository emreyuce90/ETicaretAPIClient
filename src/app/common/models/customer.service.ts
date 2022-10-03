import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CustomerListWCount } from 'src/app/contracts/customer-list-wcount';
import { CustomerCreateModel } from '../../contracts/customer-create-model';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClientService: HttpClientService) { }

  create(customer: CustomerCreateModel, successCallback: any) {
    this.httpClientService.post({ controller: "customers" }, customer).subscribe(result => { successCallback() });
  }

  /*
  Gelen datayı string dizisi ve number olarak karşıladık 
  */
  async getList(pageNumber: number, pageSize: number, successCallback?: () => void, errorCallback?: (message: string) => void) :Promise<CustomerListWCount>{
    const data: Promise<CustomerListWCount> = this.httpClientService.get<CustomerListWCount>({
      controller: "customers",
      queryString: `pageNumber=${pageNumber}&pageSize=${pageSize}`
    }).toPromise();

    data.then(d => successCallback()).catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.error))
    return await data;
  }

  async delete(id:string){
    const deleted=this.httpClientService.delete<any>({
      controller:"products"
    },id)
    await firstValueFrom(deleted);
  }
}
