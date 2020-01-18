import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Auth_Token : string = '';
  private UserId : Number;
  constructor() { }
  get Auth_T() { let token = localStorage.getItem("Auth_Token");return token;}
  set Auth_T(token : string) { localStorage.setItem("Auth_Token",token); }
}
