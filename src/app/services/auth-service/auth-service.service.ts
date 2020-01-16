import { Injectable } from '@angular/core';
import { auth } from 'src/app/entities/auth.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentCredentials : auth = {Auth_Token : ''};
  constructor() { 
  }
  setCredentials(token: string){
    this.currentCredentials.Auth_Token = token;
  }
  getCredentials(){
    return this.currentCredentials.Auth_Token;
  }
}
