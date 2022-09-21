import { Injectable } from '@angular/core';
import { CustomerCreateModel } from '../../contracts/customer-create-model';

import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClientService: HttpClientService) { }

  create(customer:CustomerCreateModel,successCallback:any) {
    this.httpClientService.post({ controller: "customers" }, customer).subscribe(result => {successCallback()});
  }
}
