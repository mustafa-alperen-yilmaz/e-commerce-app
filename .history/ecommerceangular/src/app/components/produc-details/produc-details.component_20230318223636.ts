import { Component , OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import {Route , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-produc-details',
  templateUrl: './produc-details.component.html',
  styleUrls: ['./produc-details.component.css']
})
export class ProducDetailsComponent implements OnInit {
  product!: Product;
  constructor(private productService: ProductService,
    private route: ActivatedRoute ,
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
  addToCart(){

  }
}
