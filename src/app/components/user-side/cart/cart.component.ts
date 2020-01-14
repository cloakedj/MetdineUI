import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  clearCartModalShow: boolean = false;
  constructor(
	public cart: CartService,
	) {}

  	ngOnInit() {
      if(localStorage.getItem("cart") != null)
      this.cart.loadCart();
	}

}
