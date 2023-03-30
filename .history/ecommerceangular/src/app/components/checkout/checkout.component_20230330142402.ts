import { Component, OnInit } from '@angular/core';
import{FormGroup} from '@angular/forms';
import{FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup : FormGroup;
  totalPrice : number = 0;
  totalQuantity : number = 0;

constructor(private formBuilder: FormBuilder){}
ngOnInit():void{
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
}
onSubmit(){

}
copyShippingAddressToBillingAddress(event){
  if (event.target.checked) {
    this.checkoutFormGroup.controls.billingAddress.setValue(this.checkedoutFormGroup.controls.shippingAddress.value);
  }else{
    this.checkoutFormGroup.controls.billingAddress.reset();
  }
}
}
