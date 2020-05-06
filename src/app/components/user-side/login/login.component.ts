import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '../../../services/cart-service/cart.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit , OnDestroy{
    Auth_Key = '';
    lID : any;
    loginSubscription : Subscription;
    loginForm: FormGroup = this.formbuilder.group({
    username:['',[Validators.required]],
    password:['',Validators.required],
  });
  constructor(private formbuilder: FormBuilder,
    private api : ApiService,
    private cart : CartService,
    private router : Router,
    private aroute : ActivatedRoute) {
      this.lID = this.aroute.snapshot.queryParamMap.get('logOutId');
    }

  ngOnInit() {
    console.log(localStorage);
    if(this.lID) localStorage.clear();
    console.log(localStorage);
  }
  onSubmit(Data){
    this.loginSubscription = this.api.loginUser(Data)
    .subscribe(
      (data) => {this.Auth_Key = data["key"];
      this.api.AddUserTokenHeader(this.Auth_Key)
      this.cart.loadCart()},
      (err) => console.log(err),
    );
  }
  get username(){ return this.loginForm.get('username');}
  get password(){ return this.loginForm.get('password');}
  ngOnDestroy(){
  }
  loginWithPhone(){
    this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login-with-phone)`);
  }

}
