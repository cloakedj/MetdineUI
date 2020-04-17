import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  clearCartModalShow: boolean = false;
  redirectUrl: string;
  winWidth : number;
  sellerName : string;
  sellerLogo : string;
  sellerId = localStorage.getItem("seller__id");
  constructor(
  public cart: CartService,
  public productService : ProductService,
  private api : ApiService,
  private router : Router,
  private toastr : ToastrService
	) {
    this.api.getSellerDetails(this.sellerId).subscribe(
      data => {
        this.sellerName = `${data["first_name"]}  ${data["last_name"]}`;
        this.sellerLogo = data["logo"];
        console.log(data);
      },
      err => this.toastr.error("Something Went Wrong. Please Try Later")
    )
  }

  ngOnInit() {
    this.winWidth = window.screen.width;
    this.cart.loadCart();
  }
  checkoutCart(){
    this.api.checkPhoneNumberVerStatus().subscribe(
      (data) => {
        if(data)
        this.router.navigate(['/map'],{queryParams : {checkout : true}});
        else
        this.router.navigate(["/userGateway",{outlets : {userGatewayRouter : ['verify-phone']}}],
        {queryParams : {onTheWayToCheckout : true}});
      }
    )

  }
  sellerPage(){
    this.router.navigateByUrl(`/user/(userRouterOutlet:seller-page/${this.sellerId})`);
  }

}
