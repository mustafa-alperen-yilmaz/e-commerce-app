import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators , FormBuilder} from '@angular/forms';
import { EcommerceShopFormService } from 'src/app/services/ecommerce-shop-form.service';
import {Country} from 'src/app/common/country';
import {State} from 'src/app/common/state';
import { EcommerceShopvalidators } from 'src/app/validators/ecommerce-shopvalidators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import {Router} from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private eCommerceShopFormService: EcommerceShopFormService , private cartService: CartService , private CheckoutService: CheckoutService, private router: Router) {}

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),EcommerceShopvalidators.notOnlyWhiteSpace])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required, Validators.minLength(5),EcommerceShopvalidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required, Validators.minLength(5),EcommerceShopvalidators.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required, Validators.minLength(2),EcommerceShopvalidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('',[Validators.required, Validators.pattern ('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required, Validators.pattern ('[0-9]{3}')]),
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
  reviewCartDetails(){
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    // get items from cart
  }

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email');}
  get shippingAddressStreet() {return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity() {return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState() {return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode() {return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry() {return this.checkoutFormGroup.get('shippingAddress.country');}
  get billingAddressStreet() {return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity() {return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState() {return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode() {return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry() {return this.checkoutFormGroup.get('billingAddress.country');}

  get creditCardType() {return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard() {return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode() {return this.checkoutFormGroup.get('creditCard.cardSecurityCode');}

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
