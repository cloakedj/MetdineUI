import { Component, OnInit, ɵConsole, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { CartComponent } from '../cart/cart.component';
import { IncDecCartComponent } from '../inc-dec-cart/inc-dec-cart.component';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [CartComponent,IncDecCartComponent],
})
export class ProductComponent implements OnInit{
  private containerLoaded: boolean = false;
  constructor(
  private productService: ProductService,
  private incdeccart: IncDecCartComponent,
  private cart: CartService,
  private api : ApiService,
  ) 
  { }

  ngOnInit() {
  }
  vegNonvegFilter(type : boolean):string{
    if (type) return "Veg";
    return "Non Veg";
  }

}
