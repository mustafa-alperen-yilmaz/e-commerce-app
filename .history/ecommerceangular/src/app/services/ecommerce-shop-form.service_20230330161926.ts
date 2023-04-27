import { Injectable } from '@angular/core';
import {Observable , of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    for(let theMonth = startMonth; theMonth <=12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }
  getCreditCardYear(): Observable<number[]>{
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
  }
}