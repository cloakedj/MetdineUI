import { GetCategoryService } from './../../../services/get-category/get-category.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, HostListener } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { CurrLocationService } from 'src/app/services/curr-location/curr-location.service';


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
    private gc : GetCategoryService) {
      this.hasActiveOrder();
     }
     orderStatusFilter = [
      { key: 1, value: 'Cooking' },
      { key: 2, value: 'Ready' },
      { key: 3, value: 'On The Way' },
      { key: 4, value: 'Completed' }
    ];
  ngOnInit() {
    this.ensureuser();
        if(this.userLoggedIn) {
          this.api.getUserProfileInfo().subscribe(
            data => this.username = data["username"],
            err => this.toastr.error("Something Went Wrong. Try Again Later!"),
            () => console.log("completed")
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
        this.activeOrderData = data;
      },
      err => console.log(err)
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
      err => console.log(err),
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
    getOrderStatus(id: number): any {
      let status;
      this.orderStatusFilter.forEach((kvp) => {
        if (id == kvp.key) status = kvp.value;
      });
      return status;
    }

}
