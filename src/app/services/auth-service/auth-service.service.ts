import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UserId : number;
  constructor() { }
  get Auth_T() { let token = localStorage.getItem("Auth_Token");return token;}
  set Auth_T(token : string) {localStorage.setItem("Auth_Token",token); }
  removeToken(){localStorage.removeItem("Auth_Token")}
}
