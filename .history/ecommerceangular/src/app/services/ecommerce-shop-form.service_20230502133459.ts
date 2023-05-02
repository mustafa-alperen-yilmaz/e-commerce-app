import { Injectable } from '@angular/core';
import {Observable , of} from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {map} form 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcommerceShopFormService {
  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';z
  constructor(private httpClient : HttpClient) { }
  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.categoryUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

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
    const endYear: number = startYear + 10;
    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}
interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}
