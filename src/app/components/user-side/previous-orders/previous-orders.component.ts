import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
  sellerPreviousOrders$ : Observer<any>;
  sellerPreviousOrders : any;
  completed = false;
  constructor(private api : ApiService,
  private toastr : ToastrService) {
    this.sellerPreviousOrders$ = {
      next: data => this.sellerPreviousOrders = data,
      error : err => this.toastr.error(err),
      complete : () => this.completed = true,
    }
    this.api.getBuyerPreviousOrders().subscribe(this.sellerPreviousOrders$);
   }

  ngOnInit() {
  }

}
