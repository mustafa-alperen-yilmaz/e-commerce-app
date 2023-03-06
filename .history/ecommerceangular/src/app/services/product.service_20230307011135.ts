import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observe } from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl="http://localhost:8080/api/products";
  constructor(private httpClient : HttpClient) { }
  getProductList(): Observe<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl)
    .pipe(map(response => response._embedded.products)
    );
  }
}
interface GetResponse {
  _embedded:{
    products: Product[];
  }
}
