import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  constructor(private api : ApiService) { }
  private sellerCompletedOrdersObs$ : Observer<any>;
  ItemsSold : any[];
  loading = true;
  ngOnInit() {
    this.sellerCompletedOrdersObs$ ={
      next : (data) => this.ItemsSold = data,
      error : err => console.log(err),
      complete : () => this.loading = false
    }
    this.api.getSellerDashboardOrders(false,false,4).subscribe(this.sellerCompletedOrdersObs$);
  }

}
