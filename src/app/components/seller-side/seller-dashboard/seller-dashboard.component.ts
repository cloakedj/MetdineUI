import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Subscription, Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { Router } from '@angular/router';
import { SellerDashboardService } from 'src/app/services/seller-dashboard-service/seller-dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  sellerData$: Observer<any>;
  sellerDashOptions: SellerDash;
  sellerCompletedOrders: [];
  sellerRequestedOrders: [];
  sellerActiveOrders: [];
  totalActiveOrders : any;
  sellerItemsForDashboard$: Subscription;
  sellerCompletedOrdersForDashboard$: Observer<any>;
  sellerRequestedOrdersForDashboard$: Observer<any>;
  sellerAcceptedOrdersForDashboard$: Observer<any>;
  screenSize = window.screen.width;
  distanceIsMoreThanFiveKm : boolean = false;
  completed = false;
  popupWaitOrderId : any;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  completedStep = false;
  constructor(private api: ApiService,
    private router: Router,
    private seller : SellerDashboardService,
    private toastr : ToastrService) {
  }
  ngOnInit() {
    this.sellerData$ = {
      next: (data) => {
        this.sellerDashOptions = data;
        this.seller.setSellerId(data["id"]);
      },
      error: (err) => this.toastr.error(err),
      complete : () => this.completed = true,
    };
    this.sellerCompletedOrdersForDashboard$ = {
      next: (data) => {
        this.sellerCompletedOrders = data.length > 3 ? data.splice(data.length - 3, data.length) : data;
      },
      error: (err) => this.toastr.error(err),
      complete : () => this.completed = true,
    }
    this.sellerRequestedOrdersForDashboard$ = {
      next: (data) => { this.sellerRequestedOrders = data; },
      error: (err) => this.toastr.error(err),
      complete : () => this.completed = true,
    }
    this.sellerAcceptedOrdersForDashboard$ = {
      next: (data) =>
      {
        this.totalActiveOrders = data.length;
        this.sellerActiveOrders = data.splice(0,1);
      },
      error: (err) => this.toastr.error(err),
      complete : () => this.completed = true,
    }
    this.sellerDashboardRequestedOrders();
    this.sellerDashboardActiveOrders();
    this.sellerDashboardCompletedOrders();
    this.sellerQuickdataForDashboard();
    this.sellerItemsForDashboard$ = this.api.getSellerDashboardMeals()
      .subscribe(
        (data) => {
          data;
        },
        (error) => this.toastr.error(error),
      )
    // this.api.getSellerDashboardMealById()
    //   .subscribe(
    //     (data) => data,
    //     (err) => this.toastr.error(err)
    //   )
  }
  sellerDashboardRequestedOrders() {
    this.api.getSellerDashboardOrders(true, false, 5).subscribe(this.sellerRequestedOrdersForDashboard$);
  }
  sellerDashboardActiveOrders() {
    this.api.getSellerDashboardOrders(true, true).subscribe(this.sellerAcceptedOrdersForDashboard$);
  }
  sellerDashboardCompletedOrders() {
    this.api.getSellerDashboardOrders(false, false, 4).subscribe(this.sellerCompletedOrdersForDashboard$);
  }
  sellerQuickdataForDashboard() {
    this.api.getSellerQuickData().subscribe(this.sellerData$);
  }
  sellerDashboardorderAction(orderId, status) {
    this.api.modifyRequestedOrderStatusById(orderId, status).subscribe(
      (data) => data,
      (err) => this.toastr.error(err),
      () => {
        if (status === 1) {
          this.popupWaitOrderId = 0;
          if(this.distanceIsMoreThanFiveKm) this.distanceIsMoreThanFiveKm = false;
          this.sellerDashboardRequestedOrders();
          this.sellerDashboardActiveOrders();
        }
        else if (status === 4) {
          this.sellerDashboardActiveOrders();
          this.sellerDashboardCompletedOrders();
          this.sellerQuickdataForDashboard();
        }
        else this.sellerDashboardActiveOrders();

      }
     );
  }
  updateRequestedOrderStatus(orderId: number, status: number,distance ?: any) {
    if (status === 6) {
      this.api.rejectRequestedOrderStatusById(orderId,6).subscribe(
        (data) => data,
        (err) => this.toastr.error(err),
        () => {
          this.sellerDashboardRequestedOrders();
        }
      );
    }
    else {
      if(status == 1 && distance > 5)
      {
      this.distanceIsMoreThanFiveKm = true;
      this.popupWaitOrderId = orderId;
      }
      else{
      if(status === 2){
        this.router.navigate(['/seller-side',{outlets : {'sellerRouterOutlet' :['active-order',orderId]}}])
        }
        else
        this.sellerDashboardorderAction(orderId, status);
      }
    }
  }
  getRemainingItems(size : number) {
    return size - 1;
  }
  getTableItems(id : any){
    for(const order in this.sellerRequestedOrders){
    }
  }
  getOrderStatus(id: number): any {
    let status;
    this.orderStatusFilter.forEach((kvp) => {
      if (id == kvp.key) status = kvp.value;
    });
    return status;
  }
  requestedOrdersCount(code? : number) {
    let returnArr;
    if(code === 1) returnArr = this.sellerRequestedOrders;
    else if(code === 2) returnArr = this.sellerActiveOrders;
    else returnArr = this.sellerCompletedOrders;
    if ( returnArr === undefined ) return false;
    return true;
  }
  toInt(status : string):number{
    return parseInt(status);
  }
  showAllCompletedOrders(){
    this.router.navigate(['/seller-side',{outlets  : { sellerRouterOutlet : ['completed-orders']}}]);
  }
  viewAllActiveOrders(){
    this.router.navigate(['/seller-side',{outlets  : { sellerRouterOutlet : ['active-orders']}}]);
  }
  routeToOrderImages(id : any){
    this.router.navigate(['/seller-side',{outlets : {'sellerRouterOutlet': ['active-order',id]}}])
  }
}
