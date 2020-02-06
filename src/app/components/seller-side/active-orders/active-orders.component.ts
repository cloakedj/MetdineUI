import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  allActiveOrders: any[];
  loading = true;
  allOrdersObs$ :Observer<any>;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  constructor(private api : ApiService) { 
  }

  ngOnInit() { 
    this.getActiveOrders();
  }
  getActiveOrders(){
    this.allOrdersObs$ = {
      next : data => this.allActiveOrders = data,
      error : (err) => console.log(err),
      complete : () => this.loading = false
    }
    this.api.getSellerDashboardOrders(true, true).subscribe(this.allOrdersObs$);
  }
  requestedOrdersCount() {
    if (this.allActiveOrders === undefined || 
      this.allActiveOrders.length === 0) return false;
      return true;
  }
  toInt(status : string):number{
    return parseInt(status);
  }
  updateOrderStatus(orderId, status) {
    this.loading = true;
    this.api.modifyRequestedOrderStatusById(orderId, status).subscribe(
      (data) => console.log(data),
      (err) => console.log(err),
      () => {
        this.loading = false;
        this.getActiveOrders();
      }
    )
  }
}
