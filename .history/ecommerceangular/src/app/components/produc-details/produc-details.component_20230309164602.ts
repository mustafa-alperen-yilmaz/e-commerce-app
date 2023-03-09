import { Component , OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/common/services/product.service';
import {Route , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-produc-details',
  templateUrl: './produc-details.component.html',
  styleUrls: ['./produc-details.component.css']
})
export class ProducDetailsComponent implements OnInit {
  product!: Product;
  constructor(private productService: ProductService, private route: ActivatedRoute){}
  ngOnInit(): void {

  }
}
