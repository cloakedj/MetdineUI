import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private router : Router,
  private toastr : ToastrService) {}

ngOnInit() {
}
onSubmit(Data){
  this.loginSubscription = this.api.loginUserWithPhone(Data)
  .subscribe(
    (data) => {
      if(data["key"])
      {
      this.Auth_Key = data["key"];
    this.api.AddUserTokenHeader(this.Auth_Key)
    this.cart.loadCart()
    }
    else if(data["error"])
    this.toastr.error(data["error"]);
    },
    (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
  );
}
get phone(){ return this.loginForm.get('phone');}
get password(){ return this.loginForm.get('password');}
loginWithEmail(){
  return this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login)`);
}
}
