import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Subscription, Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { Router } from '@angular/router';

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
  sellerItemsForDashboard$: Subscription;
  sellerCompletedOrdersForDashboard$: Observer<any>;
  sellerRequestedOrdersForDashboard$: Observer<any>;
  sellerAcceptedOrdersForDashboard$: Observer<any>;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  completedStep = false;
  constructor(private api: ApiService,
    private router: Router) {
  }
  ngOnInit() {
    this.sellerData$ = {
      next: (data) => this.sellerDashOptions = data,
      error: (err) => console.log(err),
      complete: () => console.log("Request completed")
    };
    this.sellerCompletedOrdersForDashboard$ = {
      next: (data) => this.sellerCompletedOrders = data,
      error: (err) => console.log(err),
      complete: () => console.log("Request for seller orders completed")
    }
    this.sellerRequestedOrdersForDashboard$ = {
      next: (data) => { this.sellerRequestedOrders = data; console.log(this.sellerRequestedOrders); },
      error: (err) => console.log(err),
      complete: () => console.log("Request for requested orders completed")
    }
    this.sellerAcceptedOrdersForDashboard$ = {
      next: (data) => this.sellerActiveOrders = data,
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
  updateRequestedOrderStatus(orderId: number, status: number) {
    if (status === 6) {
      this.api.rejectRequestedOrderStatusById(orderId).subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          this.sellerDashboardRequestedOrders();
          console.log("Order Status Modified");
        }
      );
    }
    else {
      this.sellerDashboardorderAction(orderId, status);
      if(status === 2){
        this.router.navigate(['/seller-side',{outlets : {'sellerRouterOutlet' :['active-order',orderId]}}])
      }
    }
  }
  getRemainingItems(id: Number) {
    let order: any;
    for (order of this.sellerRequestedOrders) {
      if (order.id === id) return order.items.length - 2;
    }
  }
  getOrderStatus(id: number): any {
    let status;
    this.orderStatusFilter.forEach((kvp) => {
      if (id == kvp.key) status = kvp.value;
    });
    return status;
  }
  requestedOrdersCount() {
    if (this.sellerRequestedOrders === undefined || 
      this.sellerRequestedOrders.length === 0) return false;
      return true;
  }
  toInt(status : string):number{
    return parseInt(status);
  }
}
