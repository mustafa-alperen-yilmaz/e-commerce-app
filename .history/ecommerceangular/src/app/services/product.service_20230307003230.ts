import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl="http://localhost:8080/api/products";
  constructor(private httpClient : HttpClient) { }
  getProductList(): Observe<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl)
    .pipe(map(response => response._embedded.products));
  }
}
