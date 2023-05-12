import {FormControl , ValidationErrors} from '@angular/forms';
export class EcommerceShopvalidators {

  static notOnlyWhiteSpace(value: FormControl): ValidationErrors {

    return null;
  }
}
