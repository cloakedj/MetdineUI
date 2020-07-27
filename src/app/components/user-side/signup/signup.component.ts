import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsernameEmailCheckService } from 'src/app/services/username-email-check/username-email-check.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  showUnmatchMessage: boolean = false;
  disableTillRequest = false;
  showPrivacyPolicyModal: boolean = false;
  showTermsOfUseModal: boolean = false;
  loadingUsername = false;
  loadingEmail = false;
  showUsernameAvailable = false;
  showEmailAvailable = false;
  searchingEmail = false;
  searchingUsername = false;
  checkedPolicyBox = false;
  passHasLen = false;
  passHasCapLetter = false;
  passHasNumber = false;
  passHasSpecialChar = false;
  passIsInvalid = false;
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
    this.password1.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(value => {
        this.passHasLen = value.length >= 8 ? true : false;
        this.passHasCapLetter = /[A-Z]+/.test(value);
        this.passHasNumber = /[0-9]+/.test(value);
        this.passHasSpecialChar = /[!@#$%\^&*/)/(+=._-]+/.test(value);
        this.passIsInvalid =
          this.passHasLen === false || this.passHasCapLetter === false || this.passHasNumber === false
            && this.passHasSpecialChar === false ? true : false;
      });
      this.password2.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(value => {
        this.showUnmatchMessage = this.password1.value !== this.password2.value ? true : false;
      });

  }

  onSubmit(data) {
    this.disableTillRequest = true;
      data["username"] = data["username"].toLowerCase();
    this.api.buyerRegistration(data).subscribe(
      (data) => {
        this.signUpForm.reset();
        this.router.navigateByUrl(`/confirm-email`);
       },
      (err) => {
        if(err["email"])
          this.toastr.error(err["email"])
        else
        if(err["username"])
          this.toastr.error(err["email"])
          this.disableTillRequest = false;
      },
    );
  }
  switchCheckBox(){
    this.checkedPolicyBox = !this.checkedPolicyBox;
  }
  hideModal(){
    this.showPrivacyPolicyModal === true ? this.showPrivacyPolicyModal = false
    : this.showTermsOfUseModal = false;
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
