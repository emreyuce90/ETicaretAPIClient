import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ListComponent } from 'src/app/admin/components/customers/list/list.component';
import { ProductListWCount } from 'src/app/contracts/product-list-wcount';
import { ProductCreateModel } from 'src/app/contracts/ProductCreateModel';
import { ProductImagesList } from '../../contracts/productImagesList';
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

  async list(pageNumber: number, pageSize: number, successCallback?: () => void, errorCallback?: (errorMessage: string) => void) {
    const promiseData: Promise<ProductListWCount> = this.httpClientService.get<ProductListWCount>({
      controller: "products",
      queryString: `pageNumber=${pageNumber}&pageSize=${pageSize}`
    }).toPromise();

    promiseData.then(d => successCallback())
      .catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.error))
    return await promiseData;
  }

  async delete(id: string) {
    const deletedObject: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);
    await firstValueFrom(deletedObject);
  }

  async getProductImages(id: string, successCallback: any): Promise<ProductImagesList[]> {
    const productImages: Observable<ProductImagesList[]> = this.httpClientService.get<ProductImagesList[]>({
      action: "GetProductImages",
      controller: "products",
    }, id);

    const data = await firstValueFrom(productImages);
    successCallback();
    return data;
  }

  async deleteProductImage(productId: string, imageId: string,successCallback?: any) {
    const deleted =await this.httpClientService.delete({
      action: "DeleteProductImage",
      controller: "products",
      queryString:`ImageId=${imageId}`
    }, productId);
    await firstValueFrom(deleted);
    successCallback();
  }

}
