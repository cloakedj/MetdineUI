import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private api : ApiService,
    private router : Router,
    private toastr : ToastrService) {
  }

  ngOnInit() {
  }
  onSubmit(data){
    this.api.buyerRegistration(data).subscribe(
      (data) => {
        localStorage.setItem("Auth_Token",data["key"]);
        this.router.navigateByUrl(`/user/(userRouterOutlet:home)`);
       },
      (err) => this.toastr.error(err),
    );
    this.signUpForm.reset();
  }
  ngOnDestroy(){
  }
  get fname(){ return this.signUpForm.get('fname');}
  get lname(){ return this.signUpForm.get('lname');}
  get username(){ return this.signUpForm.get('username');}
  get email(){ return this.signUpForm.get("email");}
  get phone(){ return this.signUpForm.get("phone");}
  get password1(){ return this.signUpForm.get("password1");}
  get password2(){ return this.signUpForm.get("password2");}
}
