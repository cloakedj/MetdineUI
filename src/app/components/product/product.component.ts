import { Component, OnInit, ɵConsole } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product-service/product.service';
import { CartComponent } from '../cart/cart.component';
import { IncDecCartComponent } from '../inc-dec-cart/inc-dec-cart.component';
import { CartService } from 'src/app/services/cart-service/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [CartComponent,IncDecCartComponent],
})
export class ProductComponent implements OnInit {
  products: Product[];
  constructor(
  private productService: ProductService,
  private incdeccart: IncDecCartComponent,
  private cart: CartService,
  ) 
  { }

  ngOnInit() {
   this.products = this.productService.findAll();
  }

}
