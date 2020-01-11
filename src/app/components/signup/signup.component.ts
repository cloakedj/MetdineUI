import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../entities/user.entity';
import { PassMatcher } from '../../validators/pass-matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = this.formBuilder.group({
    fname:['',Validators.required],
    lname:['',Validators.required],
    phoneNumber:['',[
    Validators.required,
    Validators.pattern('[0-9]*'),
    Validators.minLength(10),
    Validators.maxLength(10),
    ]],
    email:['',Validators.email],
    password:['',Validators.required],
    confirmPassword:['',Validators.required],
  },   {
    // check whether our password and confirm password match
    validator: PassMatcher.passwordMatchValidator
 });
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }
  signUpAction(){
    this.userData = this.signUpForm.value;
    console.log(this.userData);
  }
  get fname(){ return this.signUpForm.get('fname');}
  get lname(){ return this.signUpForm.get('lname');}
  get phoneNumber(){ return this.signUpForm.get('phoneNumber');}
  get email(){ return this.signUpForm.get("email");}
  get password(){ return this.signUpForm.get("password");}
  get confirmPassword(){ return this.signUpForm.get("confirmPassword");}
}
