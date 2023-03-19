import { Component , OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import {Route , ActivatedRoute} from '@angular/router';
import {CartService} from 'src/app/services/cart.service';
import {CartItem} from 'src/app/common/cart-item';

@Component({
  selector: 'app-produc-details',
  templateUrl: './produc-details.component.html',
  styleUrls: ['./produc-details.component.css']
})
export class ProducDetailsComponent implements OnInit {
  product!: Product;
  constructor(private productService: ProductService,
    private cartService: CartService ,
    private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.hanleProductDetails();
    })
  }
  hanleProductDetails(){
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(data => {
      this.product = data;
    })
  }
  addToCart(theProduct : Product){
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCard(theCartItem);
  }
}
