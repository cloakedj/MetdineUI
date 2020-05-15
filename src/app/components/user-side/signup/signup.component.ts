import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsernameEmailCheckService } from 'src/app/services/username-email-check/username-email-check.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  showUnmatchMessage : boolean = false;
  loadingUsername = false;
  loadingEmail = false;
  showUsernameAvailable = false;
  showEmailAvailable = false;
  searchingEmail = false;
  searchingUsername = false;
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
    private toastr : ToastrService,
    private _check : UsernameEmailCheckService) {
  }

  ngOnInit() {
    this.username.valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    .switchMap((query) => {
      this.loadingUsername = true;
      this.searchingUsername = true;
      if(query == '')
      {
      this.loadingUsername=false;
      this.searchingUsername = false;
      }
      return this._check.searchUsername(query)
    })
    .subscribe((_available : any) => {
      if(_available.status === 400) return;
      else{
        this.loadingUsername = false;
        if(_available == "false")
        this.showUsernameAvailable = true
        else
        this.showUsernameAvailable = false;
      }
    });
    this.email.valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    .switchMap((query) => {
      this.loadingEmail = true;
      this.searchingEmail = true;
      if(query == '')
      {
      this.loadingEmail = false;
      this.searchingEmail = false;
      }
      return this._check.searchUsername(query)
    })
    .subscribe((_available : any) => {
      if(_available.status === 400) return;
      else{
        this.loadingEmail = false;
        if(_available == "false")
        this.showEmailAvailable = true
        else
        this.showEmailAvailable = false;
      }
    });
  }

  onSubmit(data){
    if(this.password1.value !== this.password2.value)
    {
      this.showUnmatchMessage = true;
    }
    else{
      this.showUnmatchMessage = false;
    this.api.buyerRegistration(data).subscribe(
      (data) => {
        this.signUpForm.reset();
        this.router.navigateByUrl(`/confirm-email`);
       },
      (err) => {
        console.log(err);
        if(err["email"])
        this.toastr.error(err["email"])
        else
        if(err["username"])
        this.toastr.error(err["email"])
      },
    );
    }
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
