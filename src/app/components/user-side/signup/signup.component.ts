import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../entities/user.entity';
import { PassMatcher } from '../../../validators/pass-matcher';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup = this.formBuilder.group({
    fname:['',Validators.required],
    lname:['',Validators.required],
    username:['',[
    Validators.required,
    ]],
    email:['',Validators.email],
    password1:['',Validators.required],
    password2:['',Validators.required],
  });
  constructor(private formBuilder: FormBuilder,
    private api : ApiService) {
  }

  ngOnInit() {
  }
  onSubmit(data){
    this.api.buyerRegistration(data).subscribe();
    this.signUpForm.reset();
  }
  ngOnDestroy(){
  }
  get fname(){ return this.signUpForm.get('fname');}
  get lname(){ return this.signUpForm.get('lname');}
  get username(){ return this.signUpForm.get('username');}
  get email(){ return this.signUpForm.get("email");}
  get password1(){ return this.signUpForm.get("password1");}
  get password2(){ return this.signUpForm.get("password2");}
}
