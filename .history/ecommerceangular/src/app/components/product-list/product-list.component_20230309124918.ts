import { Component , OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] =[];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  constructor(private productService: ProductService ,
              private route : ActivatedRoute) {
    }
  ngOnInit():void{
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts(){

  }
  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId)
    .subscribe(data => {
      this.products = data;
    })
  }
}
