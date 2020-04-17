import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export enum KEYS{
  BACKSPACE = 8,
  DELETE = 46,
  RANGEUP = 48,
  RANGEDOWN = 57,
  NUMUP = 97,
  NUMDOWN = 105
}

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.css']
})

export class VerifyPhoneComponent implements OnInit {
  Auth_Key = '';
  postSignup : boolean;
  enteredPhone = false;
  isOnCheckout : boolean;
  Title = "Verify Your Phone Number."
  phone : FormControl = new FormControl('',
  [Validators.required,
  Validators.minLength(10),
  Validators.maxLength(10),
  Validators.pattern(/^[0-9]+$/)]);
  verifyPhone: FormGroup = this.formbuilder.group({
  otp:['',[Validators.required]],
});
isSellerSide : boolean;
constructor(private formbuilder: FormBuilder,
  private api : ApiService,
  private cart : CartService,
  private router : Router,
  private toastr : ToastrService,
  private aroute : ActivatedRoute) {}

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
    err => this.toastr.error("Something Went Wrong. Try Again!")
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
    err => this.toastr.error("Something Went Wrong. Try Again!")
  );
}
onSubmit(Data){
  let rid = localStorage.getItem("otp_request_id");
  if(this.isSellerSide)
  this.sellerOtpVerification(Data,rid)
  else this.buyerOtpVerification(Data,rid);
}
buyerOtpVerification(Data,rid){
  this.api.getOtpForVerificationBuyer(Data,rid)
  .subscribe(
    (data) => {
      this.toastr.success("Phone Number Has Been Successfully Verified. Redirecting...");
      localStorage.removeItem("otp_request_id");
      if(this.isOnCheckout)  this.router.navigate(['/map'],{queryParams : {checkout : true}});
      else
      this.router.navigateByUrl('/user/(userRouterOutlet:home)');
    },
    (err) => this.toastr.error("Something Went Wrong. Try Again!")
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
    (err) => this.toastr.error("Something Went Wrong. Try Again!")
  );
}
get otp(){ return this.verifyPhone.get('otp');}
ngOnDestroy(){
}
loginWithPhone(){
  this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login-with-phone)`);
}

}
