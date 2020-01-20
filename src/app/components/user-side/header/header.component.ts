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
  constructor(public cart: CartService,
    private api: ApiService,
    private router : Router) { }

  ngOnInit() {  
    this.cart.loadCart();
  }
  logUserOut(){
    this.api.logOutUser()
    .subscribe(
      data => console.log("Logged Out"),
      err => console.log(err),
      () => 
      {
        localStorage.setItem("Auth_Token","null");
        this.router.navigate(['/']);
        console.log("Logged out Successfully!");
      }
    )
  }

}
