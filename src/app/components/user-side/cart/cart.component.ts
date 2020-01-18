import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  clearCartModalShow: boolean = false;
  constructor(
  public cart: CartService,
  public productService : ProductService,
	) {}

  	ngOnInit() {
	}

}
