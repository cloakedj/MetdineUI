import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public cart: CartService,
    private api: ApiService) { }

  ngOnInit() {  
    if(localStorage.getItem("cart") != null)
    this.cart.loadCart();
  }

}
