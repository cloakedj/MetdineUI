import { Component, OnInit } from '@angular/core';
import { SellerDashboardService } from 'src/app/services/seller-dashboard-service/seller-dashboard.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  allActiveOrders: any[];
  constructor(public orders: SellerDashboardService) { 
   
  }

  ngOnInit() { 
    console.log(this.orders.sellerActiveOrders);
  }

}
