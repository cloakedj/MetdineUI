import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Auth_Token : string = '';
  private UserId : Number;
  constructor() { }
  get Auth_T() { return this.Auth_Token;}
  set Auth_T(token) { this.Auth_Token = token; }
}
