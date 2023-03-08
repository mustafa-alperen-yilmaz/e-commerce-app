import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl="http://localhost:8080/api/products"; // standart shows 20 products if we want add ?size=number it shows number of products.
  constructor(private httpClient : HttpClient) { }
  getProductList(theCategoryId : Number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl)
    .pipe(map(response => response._embedded.products)
    );
  }
  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(searchUrl)
    .pipe(map(response => response._embedded.products));
  }
}
interface GetResponseProducts {
  _embedded:{
    products: Product[];
  }
}
interface GetResponseProductCategory {
  _embedded:{
    productCategory: ProductCategory[];
  }
}

