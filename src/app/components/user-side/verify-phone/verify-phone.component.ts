import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.css']
})

export class VerifyPhoneComponent implements OnInit {
  Auth_Key = '';
  regenOtpTimer: any;
  readonly totalTime = 120;
  regenerateTimerValue = this.totalTime;
  activateResendOtpBtn = true;
  minutes;
  seconds;
  postSignup : boolean;
  enteredPhone = false;
  isOnCheckout : boolean;
  Title = "Verify Your Phone Number.";
  resendOtp = false;
  phone : FormControl = new FormControl('',
  [Validators.required,
  Validators.minLength(10),
  Validators.maxLength(10),
  Validators.pattern(/^[0-9]+$/)]);
  verifyPhone: FormGroup = this.formbuilder.group({
  otp:['',[Validators.required,
    Validators.pattern(/^[0-9]+$/),
  Validators.minLength(4),
  Validators.maxLength(4)]],
});
isSellerSide : boolean;
wrongOtpMsg : boolean = false;
constructor(private formbuilder: FormBuilder,
  private api : ApiService,
  private cart : CartService,
  private router : Router,
  private toastr : ToastrService,
  private aroute: ActivatedRoute) {
    this.setOtpDefaults();
  }

  ngOnInit() {
  this.aroute.queryParams.subscribe(params => {
    this.isSellerSide = params["sellerSide"];
    this.isOnCheckout = params["onTheWayToCheckout"];
    if(this.isSellerSide) this.Title = "Please Verify Your Phone to Become A Seller."
    else if(this.isOnCheckout) this.Title = "Please Verify Your Phone Before Completing The Order."
  });
}
requestOtpByDashboard(){
  if(this.isSellerSide)
  this.requestSellerOtp();
  else
  this.buyerRequestOtp();
}
requestSellerOtp(){
  this.api.getRequestidForOtpVerificationSeller(this.phone.value).subscribe(
    data => {
      if(data == "An account with this number already exists")
      {
      this.toastr.info("An account with this number already exists");
      this.enteredPhone = false;
      }
      else
      {
        localStorage.setItem("otp_request_id",`${data}`);
        this.enteredPhone = true;
      }
    },
    err => this.toastr.error("Something Went Wrong. Try Later!")
  );
}
buyerRequestOtp(){
  this.api.getRequestidForOtpVerificationBuyer(this.phone.value).subscribe(
    data => {
      if(data == "An account with this number already exists")
      {
        this.toastr.info("An account with this number already exists");
        this.enteredPhone = false;
      }
      else
      {
        localStorage.setItem("otp_request_id",`${data}`);
        this.enteredPhone = true;
      }
    },
    err => this.toastr.error("Something Went Wrong. Try Again Later!")
  );
}
onSubmit(Data){
  let rid = localStorage.getItem("otp_request_id");
  if(this.wrongOtpMsg) this.wrongOtpMsg = false;
  if(this.isSellerSide)
  this.sellerOtpVerification(Data,rid)
  else this.buyerOtpVerification(Data,rid);
}
buyerOtpVerification(Data,rid){
  this.api.getOtpForVerificationBuyer(Data,rid)
  .subscribe(
    (data) => {
      if(data == "Verification complete Successfully")
      {
      this.toastr.success("Phone Number Has Been Successfully Verified. Redirecting...");
      localStorage.removeItem("otp_request_id");
      localStorage.setItem("buyer-phone-status","true");
      if(this.isOnCheckout)  this.router.navigate(['/map'],{queryParams : {checkout : true}});
      else
      this.router.navigateByUrl('/user/(userRouterOutlet:home)');
      }
      else
      this.wrongOtpMsg = true;
    },
    (error) => this.toastr.error("Something Went Wrong. Try Again Later!")
  );
}
sellerOtpVerification(Data,rid){
  this.api.getOtpForVerificationSeller(Data,rid)
  .subscribe(
    (data) => {
      this.toastr.success("Phone Number Has Been Successfully Verified. Redirecting...");
      localStorage.removeItem("otp_request_id");
      localStorage.setItem("seller_phone_verified","true");
      this.router.navigateByUrl('/seller-side/(sellerRouterOutlet:seller-dashboard)');
    },
    (error) => this.toastr.error("Something Went Wrong. Try Again Later!")
  );
}
get otp(){ return this.verifyPhone.get('otp');}
  regenerateOtpTimer() {
    this.activateResendOtpBtn = false;
    this.setOtpDefaults();
    this.regenOtpTimer = setInterval(() => {
      if (this.regenerateTimerValue > 0) {
        if (this.regenerateTimerValue % 60 === 0) {
          this.minutes -= 1;
          this.seconds = 60;
        }
        this.seconds--;
        this.regenerateTimerValue--;
      }
      else {
        this.clearTimer();
        this.resendOtp = false;
        this.activateResendOtpBtn = true;
      }
    }, 1000);
}
loginWithPhone(){
  this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login-with-phone)`);
  }
clearTimer() {
  clearInterval(this.regenOtpTimer);
  }
  setOtpDefaults() {
    this.regenerateTimerValue = this.totalTime;
    this.minutes = (this.regenerateTimerValue / 60) - 1;
    this.seconds = 59;
  }

}
