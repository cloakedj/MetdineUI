import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, HostListener, ChangeDetectionStrategy, Input } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { CurrLocationService } from 'src/app/services/curr-location/curr-location.service';
import { OrderStatusService } from 'src/app/services/order-status/order-status.service';


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
  activeOrderStatus : boolean;
  activeOrderData : any;
  activeOrderId : any;
  @HostListener('click',['$event'])
  hideMask(evt){
    if(evt.target.className.includes("searchDesktop"))
    {
      this.searchOn = true;
    }
    else
    if(evt.target.className.includes('icon') && evt.target.className != "search icon"){
      if(this.searchOn) this.searchOn = !this.searchOn;
    }
  }
  constructor(public cart: CartService,
    private api: ApiService,
    public auth : AuthService,
    private router : Router,
    public product : ProductService,
    private toastr : ToastrService,
    public  currlc : CurrLocationService,
    public orderStatus : OrderStatusService) {
      this.hasActiveOrder();
     }
  ngOnInit() {
    this.ensureuser();
        if(this.userLoggedIn) {
          this.api.getUserProfileInfo().subscribe(
            data => {
              this.username = data["username"];
              if(!this.product.address) this.product.GetLocation();
            },
          );
      this.cart.loadCart();
        }
  }
  hasActiveOrder(){
    this.api.checkIfActiveOrder().subscribe(
      data => {
        this.activeOrderStatus = data["detail"];
        if(this.activeOrderStatus)
        this.getActiveOrderData();
      },
      err => this.toastr.error("Somethine Went Wrong. Try Again Later!")

    )
  }
  getActiveOrderData(){
    this.api.getActiveOrderDetailsForBuyer().subscribe(
      data => {
        this.activeOrderId = data[0].id;
        this.orderStatus.getOrderStatus(this.activeOrderId);
        this.activeOrderData = data;
      },
      err => this.toastr.error(err)
    )
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
      data => this.toastr.success("Logged Out Succesfully"),
      err => this.toastr.error(err),
      () =>
      {
        localStorage.clear();
        this.router.navigateByUrl('/userGateway/(userGatewayRouter:login)');
      }
    )
    }
    turnSearchOff(event){
      this.searchOn = event;
    }

}
