import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-seller-profile-data',
  templateUrl: './seller-profile-data.component.html',
  styleUrls: ['./seller-profile-data.component.css']
})
export class SellerProfileDataComponent implements OnInit {
  sellerData$ : Observer<any>;
  sellerDashOptions: SellerDash;
  sellerCompletedOrdersForDashboard$: Observer<any>;
  sellerCompletedOrders : any[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.sellerData$ = {
      next: (data) => {
        this.sellerDashOptions = data;
      },
      error: (err) => console.log(err),
      complete: () => console.log("Request completed")
    };
    this.sellerCompletedOrdersForDashboard$ = {
      next: (data) => this.sellerCompletedOrders = data.splice(0,2),
      error: (err) => console.log(err),
      complete: () => console.log("Request for seller orders completed")
    }
    this.api.getSellerQuickData().subscribe(this.sellerData$);
    this.api.getSellerDashboardOrders(false, false, 4)
    .subscribe(this.sellerCompletedOrdersForDashboard$);
  }

}
