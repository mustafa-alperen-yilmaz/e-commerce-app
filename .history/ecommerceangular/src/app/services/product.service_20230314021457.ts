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
  private categoryUrl = "http://localhost:8080/api/product-category";
  constructor(private httpClient : HttpClient) { }

  getProductList(theCategoryId : Number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }
  getProductListPaginate(theCategoryId : Number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }
  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl)
    .pipe(map(response => response._embedded.productCategory));
  }
  searchProducts(theKeyword: string): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(searchUrl)
    .pipe(map(response => response._embedded.products)
    );
  }
  getProduct(theProductId: Number): Observable<Product>{
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}
interface GetResponseProducts {
  _embedded:{
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetResponseProductCategory {
  _embedded:{
    productCategory: ProductCategory[];
  }
}

