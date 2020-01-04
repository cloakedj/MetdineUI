import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class LoginFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm =  new FormGroup({
    phoneNumberFC: new FormControl('',[
      Validators.required,
    ]),
  });
  constructor() {}

  ngOnInit() {
  }
  

}
