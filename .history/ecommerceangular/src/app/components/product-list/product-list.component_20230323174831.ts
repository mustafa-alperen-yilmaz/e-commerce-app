import { Component , OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { Router, ActivatedRoute } from '@angular/router';
import {CartService} from 'src/app/services/cart.service';
import {CartItem} from 'src/app/common/cart-item';
import {timeoutWith} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] =[];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousCategoryId: number = 1;
  previousKeyword: string = "";
  constructor(private productService: ProductService ,
              private cartService: CartService,
              private route : ActivatedRoute) {
    }
  ngOnInit(){
    this.route.paramMap.subscribe(() => {
      this.listProducts();
      console.log(this.products);
    });
  }
  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    if(this.previousKeyword != theKeyword){
      this.thePageNumber =1;
    }
    this.previousKeyword = theKeyword;
    this.productService.searchProductsPaginate(this.thePageNumber -1,this.thePageSize , theKeyword)
    .subscribe(this.processResult());
  }
  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(hasCategoryId);
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductListPaginate(this.thePageNumber -1, this.thePageSize, this.currentCategoryId)
    .subscribe(this.processResult());
  }
  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
  processResult(){
    return(data: any)=>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  addToCard(theProduct: Product){
    /*
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
    */
   console.log('adding cart ' ${theProduct.name});
  }
}
