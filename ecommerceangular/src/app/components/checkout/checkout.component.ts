import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators , FormBuilder} from '@angular/forms';
import { EcommerceShopFormService } from 'src/app/services/ecommerce-shop-form.service';
import {Country} from 'src/app/common/country';
import {State} from 'src/app/common/state';
import { EcommerceShopvalidators } from 'src/app/validators/ecommerce-shopvalidators';

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
        firstName: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),EcommerceShopvalidators.notOnlyWhiteSpace])
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

  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email');}

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
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
  getStates(formGroupName: string) {
    const group = this.checkoutFormGroup.get(formGroupName);
    if (group) {
      const country = group.value.country;
      if (country) {
        const countryCode = country.code;
        this.eCommerceShopFormService.getStates(countryCode).subscribe(
          data => {
            if (formGroupName === 'shippingAddress') {
              this.shippingAddressStates = data;
            } else {
              this.billingAddressStates = data;
            }
            const stateControl = group.get('state');
            if (stateControl) {
              stateControl.setValue(data[0]);
            }
          }
        );
      }
    }
  }
}
