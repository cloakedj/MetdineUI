import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UserId : Number;
  constructor() { }
  get S_mode(){ return localStorage.getItem("seller_mode_active");}
  set S_mode(status : string){ localStorage.setItem("seller_mode_active",status)}
  get Auth_T() { let token = localStorage.getItem("Auth_Token");return token;}
  set Auth_T(token : string) {localStorage.setItem("Auth_Token",token); }
}
