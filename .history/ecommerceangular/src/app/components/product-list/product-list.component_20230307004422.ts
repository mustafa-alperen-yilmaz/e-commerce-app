import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-procud-list',
  templateUrl: './procud-list.component.html',
  styleUrls: ['./procud-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] = [];
  constructor(private productService : ProductService){}

  ngOnInit():void{}
}
