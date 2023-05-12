import {FormControl , ValidationErrors} from '@angular/forms';
export class EcommerceShopvalidators {

  static notOnlyWhiteSpace(value: FormControl): ValidationErrors {

    if((control.value != null)&&(control.value.trim().length === 0)){
      return {'notOnlyWhiteSpace': true};
    }else{
      return null;
    }
  }
}
