import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = this.formbuilder.group({
    userName:['',[Validators.email,Validators.required]],
    password:['',Validators.required],
  });
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
  }
  get userName(){ return this.loginForm.get('userName');}
  get password(){ return this.loginForm.get('password');}

}
