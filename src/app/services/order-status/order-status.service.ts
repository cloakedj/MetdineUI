import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  orderStatus : any;
  constructor(
    private api : ApiService,
    private toastr : ToastrService
  ) { }
  getOrderStatus(id : any){
    this.api.getActiveOrderStatusById(id)
    .subscribe(
      data => {
        this.orderStatus = data;
      },
      err => this.toastr.error("Something Went Wrong!")
    )
  }
}
