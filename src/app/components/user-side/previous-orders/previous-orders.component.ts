import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
  sellerPreviousOrders$ : Observer<any>;
  sellerPreviousOrders : any;
  constructor(private api : ApiService) {
    this.sellerPreviousOrders$ = {
      next: data => this.sellerPreviousOrders = data,
      error : err => console.log(err),
      complete : () => console.log("fetched previous orders")
    }
    this.api.getBuyerPreviousOrders().subscribe(this.sellerPreviousOrders$);
   }

  ngOnInit() {
  }

}
