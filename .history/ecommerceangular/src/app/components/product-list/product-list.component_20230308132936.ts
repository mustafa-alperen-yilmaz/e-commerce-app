import { Component , OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] =[];
  currentCategoryId: number;
  constructor(private productService: ProductService ,
      private route : ActivatedRoute) {
    }
  ngOnInit():void{
    this.route.paramMap.subscribe(() => {
    this.listProducts();
    });
  }
  listProducts(){
    this.productService.getProductList()
    .subscribe(data => {
      this.products = data;
    })
  }
}
