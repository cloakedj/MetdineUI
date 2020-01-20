import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  clearCartModalShow: boolean = false;
  constructor(
  private cart: CartService,
  private productService : ProductService,
  private api : ApiService
	) {}

  	ngOnInit() {
  }
  checkoutCart(id,total){
    this.api.checkoutUserCart(id,total)
    .subscribe(
      data => console.log("User Checked Out"),
      err => console.log(err),
      () =>{
        this.cart.loadCart();
        console.log("Completed Checkout");
      } 
    )
  }
}
