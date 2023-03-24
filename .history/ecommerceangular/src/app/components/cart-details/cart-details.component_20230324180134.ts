import { Component , OnInit} from '@angular/core';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails(){
    this.cartItems = this.cartService.cartItems;
    this.cartItems.totalPrice.subscribe(data=> this.totalPrice = data;);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity);
  }
}
