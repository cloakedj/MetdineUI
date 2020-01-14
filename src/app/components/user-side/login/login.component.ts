import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    res$ : Observable<any>;
    loginForm: FormGroup = this.formbuilder.group({
    username:['',[Validators.required]],
    password:['',Validators.required],
  });
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) {}

  ngOnInit() {
  }
  onSubmit(Data){
    this.api.loginUser(Data);
    this.loginForm.reset();
  }
  get username(){ return this.loginForm.get('username');}
  get password(){ return this.loginForm.get('password');}

}
