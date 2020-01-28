import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  clearCartModalShow: boolean = false;
  redirectUrl: string;
  constructor(
  private cart: CartService,
  private productService : ProductService,
  private api : ApiService,
	) {}

  	ngOnInit() {
      this.cart.loadCart();
  }
  checkoutCart(){
    this.api.checkoutUserCart()
    .subscribe(
      data => this.redirectUrl = data["redirect_url"],
      err => console.log(err),
      () =>{
        location.href = this.redirectUrl;
        console.log("Completed Checkout");
      } 
    )
  }
}
