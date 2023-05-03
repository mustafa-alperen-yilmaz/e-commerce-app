import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EcommerceShopFormService } from 'src/app/services/ecommerce-shop-form.service';
import {Country} from 'src/app/common/country';
import {State} from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private eCommerceShopFormService: EcommerceShopFormService) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;
    this.eCommerceShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
    this.eCommerceShopFormService.getCreditCardYear().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
    this.eCommerceShopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  onSubmit() {}

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    if (creditCardFormGroup) {
      const currentYear: number = new Date().getFullYear();
      const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
      let startMonth: number;
      if (currentYear === selectedYear) {
        startMonth = new Date().getMonth() + 1;
      } else {
        startMonth = 1;
      }
      this.eCommerceShopFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          this.creditCardMonths = data;
        }
      );
    }
  }
  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName)!;
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    this.eCommerceShopFormService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0]);
      }
    );

  }
}
