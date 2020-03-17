import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  loginSubscription : Subscription;
  verifyPhone: FormGroup = this.formbuilder.group({
  otpval1:['',[Validators.required]],
  otpval2:['',[Validators.required]],
  otpval3:['',[Validators.required]],
  otpval4:['',[Validators.required]],
  otpval5:['',[Validators.required]],
  otpval6:['',[Validators.required]]
});
constructor(private formbuilder: FormBuilder,
  private api : ApiService,
  private cart : CartService,
  private router : Router) {}

ngOnInit() {
}
@HostListener('window:keyup',['$event'])
keyEvent(event : KeyboardEvent){

}
onSubmit(Data){
  this.loginSubscription = this.api.loginUser(Data)
  .subscribe(
    (data) => {this.Auth_Key = data["key"];this.cart.loadCart()},
    (err) => console.log(err),
    () =>   this.api.AddUserTokenHeader(this.Auth_Key)
  );
}
get otpval1(){ return this.otpval1.get('otpval1');}
get otpval2(){ return this.otpval2.get('otpval2');}
get otpval3(){ return this.otpval3.get('otpval3');}
get otpval4(){ return this.otpval4.get('otpval4');}
get otpval5(){ return this.otpval5.get('otpval5');}
get otpval6(){ return this.otpval6.get('otpval6');}
ngOnDestroy(){
}
loginWithPhone(){
  this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login-with-phone)`);
}
moveToNextBox(event){ 

}
moveToPrevBox(){ 
  
}

}
