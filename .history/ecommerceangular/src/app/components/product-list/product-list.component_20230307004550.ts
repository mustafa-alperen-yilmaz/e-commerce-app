import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] = [];
  constructor(private productService : ProductService){}

  ngOnInit():void{
    this.listProducts();
  }
  listProducts(){
    throw new Error("Method not implemented.");
  }
}
