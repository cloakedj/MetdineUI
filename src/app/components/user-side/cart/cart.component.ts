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
  winWidth : number;
  constructor(
  public cart: CartService,
  public productService : ProductService,
  private api : ApiService,
  private router : Router
	) {}

  ngOnInit() {
    this.winWidth = window.innerWidth;
    this.cart.loadCart();
  }
  checkoutCart(){
    this.router.navigate(['/map'],{queryParams : {checkout : true}})
  }
}
