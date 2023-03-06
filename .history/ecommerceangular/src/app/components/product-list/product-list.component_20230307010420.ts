import { Component , OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Products } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] = [];
  constructor(){}

  ngOnInit():void{
    this.listProducts();
  }
  listProducts(){
    this.productService.getProductList()
    .subscribe(data => {
      this.products = data;
    })
  }
}
