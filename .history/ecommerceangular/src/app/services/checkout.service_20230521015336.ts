import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Purchase} from 'src/app/common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  constructor(private httpClient: HttpClient) {
    placeOrder(purchase: Purchase): Observable<any>{

    }
  }
}
