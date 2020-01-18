import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Subscription, Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  sellerData$ : Observer<any>;
  sellerDashOptions : SellerDash; 
  sellerOrders : [];
  sellerItemsForDashboard$ : Subscription;
  sellerOrdersForDashboard$ : Observer<any>;
  constructor(private api : ApiService) { 
  }
  ngOnInit() {
   this.sellerData$ = {
     next : (data) => this.sellerDashOptions = data,
     error : (err) => console.log(err),
     complete : () => console.log("Request completed")
   };
   this.sellerOrdersForDashboard$ = {
     next : (data) => this.sellerOrders = data,
     error: (err) => console.log(err),
     complete : () => console.log("Request for seller orders completed")
   }
   this.api.getSellerQuickData().subscribe(this.sellerData$);
   this.api.getSellerDashboardOrders().subscribe(this.sellerOrdersForDashboard$);
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
}
