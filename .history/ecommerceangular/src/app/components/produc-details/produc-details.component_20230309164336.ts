import { Component , OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-produc-details',
  templateUrl: './produc-details.component.html',
  styleUrls: ['./produc-details.component.css']
})
export class ProducDetailsComponent implements OnInit {
  product!: Product;
  constructor(){}
  ngOnInit(): void {

  }
}
