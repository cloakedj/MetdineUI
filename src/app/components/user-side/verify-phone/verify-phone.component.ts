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
  phone : FormControl = new FormControl('',      
  [Validators.required,
  Validators.minLength(10),
  Validators.maxLength(10),
  Validators.pattern(/^[0-9]+$/)]);
  verifyPhone: FormGroup = this.formbuilder.group({
  otp:['',[Validators.required]],
});
constructor(private formbuilder: FormBuilder,
  private api : ApiService,
  private cart : CartService,
  private router : Router,
  private toastr : ToastrService,
  private aroute : ActivatedRoute) {}

ngOnInit() {
}
requestOtp(){
  console.log(this.phone.value);
  this.api.getRequestidForOtpVerification(this.phone.value).subscribe(
    data => localStorage.setItem("otp_request_id",`${data}`),
    err => this.toastr.error("Something Went Wrong. Try Again!")
  );
  this.enteredPhone = true;
}
onSubmit(Data){
  let rid = localStorage.getItem("otp_request_id");
  this.api.getOtpForVerification(Data,rid)
  .subscribe(
    (data) => {
      this.toastr.success("Phone Number Has Been Successfully Verified. Redirecting...");
      localStorage.removeItem("otp_request_id");
      this.router.navigateByUrl('/user/(userRouterOutlet:home)');
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
