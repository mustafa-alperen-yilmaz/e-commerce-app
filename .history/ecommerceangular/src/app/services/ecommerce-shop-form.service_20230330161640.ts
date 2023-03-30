import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

  }
}
