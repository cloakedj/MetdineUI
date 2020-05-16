import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Subscription, Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { Router } from '@angular/router';
import { SellerDashboardService } from 'src/app/services/seller-dashboard-service/seller-dashboard.service';

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
    private seller : SellerDashboardService) {
  }
  ngOnInit() {
    this.sellerData$ = {
      next: (data) => {
        this.sellerDashOptions = data;
        this.seller.setSellerId(data["id"]);
      },
      error: (err) => console.log(err),
      complete: () => console.log("Request completed")
    };
    this.sellerCompletedOrdersForDashboard$ = {
      next: (data) => this.sellerCompletedOrders = data.splice(data.length - 4,data.length),
      error: (err) => console.log(err),
      complete: () => console.log("Request for seller orders completed")
    }
    this.sellerRequestedOrdersForDashboard$ = {
      next: (data) => { this.sellerRequestedOrders = data; },
      error: (err) => console.log(err),
      complete: () => console.log("Request for requested orders completed")
    }
    this.sellerAcceptedOrdersForDashboard$ = {
      next: (data) =>
      {
        this.totalActiveOrders = data.length;
        this.sellerActiveOrders = data.splice(0,1);
      },
      error: (err) => console.log(err),
      complete: () => console.log("Request for active orders completed")
    }
    this.sellerDashboardRequestedOrders();
    this.sellerDashboardActiveOrders();
    this.sellerDashboardCompletedOrders();
    this.sellerQuickdataForDashboard();
    this.sellerItemsForDashboard$ = this.api.getSellerDashboardMeals()
      .subscribe(
        (data) => {
          console.log(data);
          data;
        },
        (error) => console.log(error),
        () => console.log("Fetch Meals Completed")
      )
    this.api.getSellerDashboardMealById()
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => console.log("Fetched Single Meal data Request Completed")
      )
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
      (data) => console.log(data),
      (err) => console.log(err),
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
        console.log("Order Status Modified");
      }
    );
  }
  updateRequestedOrderStatus(orderId: number, status: number,distance ?: any) {
    if (status === 6) {
      this.api.rejectRequestedOrderStatusById(orderId,6).subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          this.sellerDashboardRequestedOrders();
          console.log("Order Status Modified");
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
      this.sellerDashboardorderAction(orderId, status);
      if(status === 2){
        this.router.navigate(['/seller-side',{outlets : {'sellerRouterOutlet' :['active-order',orderId]}}])
      }
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
