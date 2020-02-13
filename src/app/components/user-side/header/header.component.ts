import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchOn = false;
  userLoggedIn : boolean = false;
  readonly screenSize = window.screen.width;
  constructor(public cart: CartService,
    private api: ApiService,
    public auth : AuthService,
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
  ensureuser(){this.userLoggedIn  = localStorage.getItem("Auth_Token") ? true : false  }
  logUserOut(){
    this.api.logOutUser()
    .subscribe(
      data => console.log("Logged Out"),
      err => console.log(err),
      () => 
      {
        localStorage.clear();
        this.router.navigateByUrl('/userGateway/(userGatewayRouter:login)');
        console.log("Logged out Successfully!");
      }
    )
    }

}
