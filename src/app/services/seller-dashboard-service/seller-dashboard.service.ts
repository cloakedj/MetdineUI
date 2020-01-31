import { Injectable, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService implements OnInit{

  sellerData$ : Observer<any>;
  sellerDashOptions : SellerDash; 
  sellerCompletedOrders : [];
  sellerRequestedOrders : [];
  sellerActiveOrders: [];
  sellerItemsForDashboard$ : Subscription;
  sellerCompletedOrdersForDashboard$ : Observer<any>;
  sellerRequestedOrdersForDashboard$ : Observer<any>; 
  sellerAcceptedOrdersForDashboard$ : Observer<any>;
  constructor(private api : ApiService,
    private router : Router) { 
  }
  ngOnInit() {
   this.sellerData$ = {
     next : (data) => this.sellerDashOptions = data,
     error : (err) => console.log(err),
     complete : () => console.log("Request completed")
   };
   this.sellerCompletedOrdersForDashboard$ = {
     next : (data) => this.sellerCompletedOrders = data,
     error: (err) => console.log(err),
     complete : () => console.log("Request for seller orders completed")
   }
   this.sellerRequestedOrdersForDashboard$ = {
     next : (data) => this.sellerRequestedOrders = data,
     error : (err) => console.log(err),
     complete : () => console.log("Request for requested orders completed")
   }
   this.sellerAcceptedOrdersForDashboard$  = {
    next : (data) => this.sellerActiveOrders = data,
    error : (err) => console.log(err),
    complete : () => console.log("Request for active orders completed")
  }
   this.sellerDashboardRequestedOrders();
   this.sellerDashboardActiveOrders();  
   this.sellerDashboardCompletedOrders();
   this.sellerQuickdataForDashboard();
    this.sellerItemsForDashboard$ = this.api.getSellerDashboardMeals()
    .subscribe(
      (data) =>{
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
  sellerDashboardRequestedOrders(){
    this.api.getSellerDashboardOrders(true,false,5).subscribe(this.sellerRequestedOrdersForDashboard$);
  }
  sellerDashboardActiveOrders(){
    this.api.getSellerDashboardOrders(true,true).subscribe(this.sellerAcceptedOrdersForDashboard$);
  }
  sellerDashboardCompletedOrders()
  {
    this.api.getSellerDashboardOrders(false,false,4).subscribe(this.sellerCompletedOrdersForDashboard$);
  }
  sellerQuickdataForDashboard()
  {
    this.api.getSellerQuickData().subscribe(this.sellerData$);
  }
  sellerDashboardorderAction(orderId,status){
    this.api.modifyRequestedOrderStatusById(orderId,status).subscribe(
      (data) => console.log(data),
      (err) => console.log(err),
      () => 
      {
        if(status === 1) 
        {
          this.sellerDashboardRequestedOrders();
          this.sellerDashboardActiveOrders(); 
        }
        else if(status === 4)
        {
          this.sellerDashboardActiveOrders(); 
          this.sellerDashboardCompletedOrders();
          this.sellerQuickdataForDashboard();
        }
        else this.sellerDashboardActiveOrders(); 
        console.log("Order Status Modified");
      }
    );
  }
  updateRequestedOrderStatus(orderId : number,status : number){
    if(status === 6)
    {
      this.api.rejectRequestedOrderStatusById(orderId).subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          this.sellerDashboardRequestedOrders();
          console.log("Order Status Modified");
        }
      );
    }
    else this.sellerDashboardorderAction(orderId,status);
  }
}
