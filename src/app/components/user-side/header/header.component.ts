import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn : boolean = false;
  constructor(public cart: CartService,
    private api: ApiService,
    private router : Router) { }
    itemsInCart : number = 0;

  ngOnInit() {  
    this.ensureuser();
        if(this.userLoggedIn) {
      this.itemsInCart = this.cart.getCartLength();
      this.cart.loadCart();
        }
  }
  getlengthIfLoggedIn(){
    if(this.api.checkUserToken()) {
      this.itemsInCart = this.cart.getCartLength();
      this.cart.loadCart();
    }
  }
  ensureuser(){this.userLoggedIn  = this.api.ensurity(); }
  logUserOut(){
    this.api.logOutUser()
    .subscribe(
      data => console.log("Logged Out"),
      err => console.log(err),
      () => 
      {
        localStorage.removeItem("Auth_Token");
        localStorage.removeItem("is_seller");
        this.router.navigate(['/']);
        console.log("Logged out Successfully!");
      }
    )
    }

}
