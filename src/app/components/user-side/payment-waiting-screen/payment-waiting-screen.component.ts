import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-waiting-screen',
  templateUrl: './payment-waiting-screen.component.html',
  styleUrls: ['./payment-waiting-screen.component.css']
})
export class PaymentWaitingScreenComponent implements OnInit {
  paymentStatus : boolean;
  loaderOff : boolean = true; 
  constructor(
    private router : Router,
    private aroute : ActivatedRoute
  ) {
    this.aroute.queryParams.subscribe(query=>{
      this.paymentStatus = query['status'];
    })
   }

  ngOnInit() {
    if(this.paymentStatus)
    {
    setTimeout(() => this.loaderOff = true, 5000);
    setTimeout(() =>this.router.navigate(['/user',{outlets : {userRouterOutlet : ['active-order']}}]),10000);
    }
    else{
      setTimeout(() => this.loaderOff = true, 5000);
      setTimeout(() =>this.router.navigate(['/user',{outlets : {userRouterOutlet : ['profile']}}]),10000);
    }
  }

}
