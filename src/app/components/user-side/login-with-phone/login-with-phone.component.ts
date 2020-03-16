import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-phone',
  templateUrl: './login-with-phone.component.html',
  styleUrls: ['./login-with-phone.component.css']
})
export class LoginWithPhoneComponent implements OnInit {
  Auth_Key = '';
  loginSubscription : Subscription;
  loginForm: FormGroup = this.formbuilder.group({
  phone:['',[Validators.required]],
  password:['',Validators.required],
});
constructor(private formbuilder: FormBuilder,
  private api : ApiService,
  private cart : CartService,
  private router : Router) {}

ngOnInit() {
}
onSubmit(Data){
  this.loginSubscription = this.api.loginUserWithPhone(Data)
  .subscribe(
    (data) => {this.Auth_Key = data["key"];this.cart.loadCart()},
    (err) => console.log(err),
    () =>   this.api.AddUserTokenHeader(this.Auth_Key)
  );
}
get phone(){ return this.loginForm.get('phone');}
get password(){ return this.loginForm.get('password');}
loginWithEmail(){ 
  return this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login)`);
}
}
