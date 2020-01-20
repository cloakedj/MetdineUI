import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit , OnDestroy{
    Auth_Key = '';
    loginSubscription : Subscription;
    loginForm: FormGroup = this.formbuilder.group({
    username:['',[Validators.required]],
    password:['',Validators.required],
  });
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) {}

  ngOnInit() {
  }
  onSubmit(Data){
    this.loginSubscription = this.api.loginUser(Data)
    .subscribe(
      (data) => {this.Auth_Key = data["key"];},
      (err) => console.log(err),
      () =>     this.api.AddUserTokenHeader(this.Auth_Key)
    );
  }
  get username(){ return this.loginForm.get('username');}
  get password(){ return this.loginForm.get('password');}
  ngOnDestroy(){
  }

}
