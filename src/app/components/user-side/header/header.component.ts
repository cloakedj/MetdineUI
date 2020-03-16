import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { ProductService } from 'src/app/services/product-service/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchOn = false;
  userLoggedIn : boolean = false;
  readonly screenSize = window.screen.width;
  username: string;
  constructor(public cart: CartService,
    private api: ApiService,
    public auth : AuthService,
    private router : Router,
    public product : ProductService) { }

  ngOnInit() {  
    this.ensureuser();
        if(this.userLoggedIn) {
          this.api.getUserProfileInfo().subscribe(
            data => this.username = data["username"],
            err => console.log(err),
            () => console.log("completed")
          );
      this.cart.loadCart();
        }
  }
  getlengthIfLoggedIn(){
    if(this.api.checkUserToken()) {
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
    turnSearchOff(event){
      this.searchOn = event;
    }

}
