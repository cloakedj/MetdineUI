import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-seller-payment-menu',
  templateUrl: './seller-payment-menu.component.html',
  styleUrls: ['./seller-payment-menu.component.css']
})
export class SellerPaymentMenuComponent implements OnInit {
 paymentHistorySeller$ : Observer<any>;
 sellerPaymentHistory : [];
  constructor(
    private api : ApiService
  ) { }

  ngOnInit() {
    this.paymentHistorySeller$ ={
      next : (data) => {
        this.sellerPaymentHistory = data
        console.log(this.sellerPaymentHistory);
      },
      error : (err) => console.log(err),
      complete : () => console.log("Request to payment data completed")
    } 
    this.api.getSellerPaymentHistory().subscribe(this.paymentHistorySeller$);
  }

}
