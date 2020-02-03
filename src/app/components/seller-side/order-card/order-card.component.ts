import { Component, OnInit, Input } from '@angular/core';
import { SellerDashboardService } from 'src/app/services/seller-dashboard-service/seller-dashboard.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() order : any;
  @Input() itemCount : any;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  constructor() { }

  ngOnInit() {
  }
  getOrderStatus(id: number): any {
    let status;
    this.orderStatusFilter.forEach((kvp) => {
      if (id == kvp.key) status = kvp.value;
    });
    return status;
  }

  
}
