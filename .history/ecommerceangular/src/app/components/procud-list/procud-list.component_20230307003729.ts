import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-procud-list',
  templateUrl: './procud-list.component.html',
  styleUrls: ['./procud-list.component.css']
})
export class ProcudListComponent implements OnInit {
  constructor(private productService : ProductService){}

  ngOnInit():void{}
}
