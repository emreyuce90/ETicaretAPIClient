import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = "https://localhost:7021/api";

  //baseUrl dolu ise request parameters tan gelen url yi baz al değilse bu serviste tanımlanmış olan baseUelyi baz al, request parametreden controller ı al eğer action tanımlanmışsa actionu al tanımlanmamışsa boş bırak
  private url(requestParameters: Partial<RequestParameters>): string {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }
  get<T>(requestParameters: Partial<RequestParameters>, id?: string) {
    //isteğin yapılacağı url
    let url: string = "";
    //get istekleri için özelleştirdiğimiz url
    //eğer requestParameters tan full endpoint geldiyse requestParameters tan gelen fullendpointi eğer fullendpoint ten veri gelmezse de yukarıda yazdığımız metoda oluşturduğumuz requestParametersi metoda vererek urlyi geçeriz
    if (requestParameters.fullEndpoint != null) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${id ? `/${id}` : ""}`;
    }
    return this.httpClient.get<T>(url, { headers: requestParameters.headers });

  }

  post() {

  }

  put() {

  }

  delete() {

  }

}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}

