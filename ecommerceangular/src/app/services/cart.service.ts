import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem){
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem | undefined;

    if(this.cartItems.length > 0){ /*
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }
      */
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
    }

    alreadyExistsInCart = (existingCartItem !== undefined);

    if(alreadyExistsInCart){
      if(existingCartItem){
        existingCartItem.quantity++;
      }
    }else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number , totalQuantityValue: number){
    console.log('Cart info: Total price = ' + totalPriceValue + ', Total quantity = ' + totalQuantityValue);
  }
  decreamentQuantity(theCartItem: CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem){
    const itmeIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    if(itmeIndex > -1){
      this.cartItems.splice(itmeIndex, 1);
      this.computeCartTotals();
    }
  }
}
