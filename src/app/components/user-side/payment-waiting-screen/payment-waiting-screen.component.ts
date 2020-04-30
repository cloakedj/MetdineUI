import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-waiting-screen',
  templateUrl: './payment-waiting-screen.component.html',
  styleUrls: ['./payment-waiting-screen.component.css']
})
export class PaymentWaitingScreenComponent implements OnInit {
  paymentStatus : boolean;
  orderId : any;
  loaderOff : boolean = false;
  constructor(
    private router : Router,
    private aroute : ActivatedRoute
  ) {
    this.aroute.queryParams.subscribe(query=>{
      this.paymentStatus = query['status'];
      this.orderId = query['order'];
    })
   }

  ngOnInit() {
    if(this.paymentStatus)
    {
    setTimeout(() => this.loaderOff = true, 4000);
    setTimeout(() =>this.router.navigate(['/user',{outlets : {userRouterOutlet : ['active-order',this.orderId]}}]),6000);
    }
    else{
      setTimeout(() => this.loaderOff = true, 4000);
      setTimeout(() =>this.router.navigate(['/user',{outlets : {userRouterOutlet : ['profile']}}]),6000);
    }
  }

}
