import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl="http://localhost:8080/api/products"; // standart shows 20 products if we want add ?size=number it shows number of products.
  constructor(private httpClient : HttpClient) { }
  getProductList(theCategoryId : Number): Observable<Product[]>{
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
