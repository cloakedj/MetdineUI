import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Seller } from '../../entities/seller.entity';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { User } from '../../entities/user.entity';
import { catchError, retry } from 'rxjs/operators';
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { error } from 'util';
import { AuthService } from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://83c7e284.ngrok.io';
  mealId;
  private isUserAuthenticated = this.checkUserToken !== null ? true :false;
  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':`Token ${this.auth.getCredentials()}`
  });
  constructor(private http: HttpClient,
    private router : Router,
    private auth: AuthService,
    ) { 
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getAllSellers():Observable<Seller[]>{
      return this.http.get<Seller[]>(`${this.API_URL}/api/seller/`);
  }
  getSellerDetails(): Observable<SellerItem>{
    return this.http.get<SellerItem>(`${this.API_URL}/api/seller/`)
  }
  buyerRegistration(userData : User):Observable<User>{
    return this.http.post<User>(`${this.API_URL}/rest-auth/registration/`, userData,{headers : this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  loginUser(credentials){
    return this.http.post(`${this.API_URL}/rest-auth/login/`, credentials)
    .pipe(
      catchError(this.handleError)
    )
  }
  AddUserTokenHeader(token :string){
    this.auth.setCredentials(token);
    if(this.auth.getCredentials() !== '')
    this.router.navigate(['/home']);
  }
  checkUserToken():any{
    if(this.auth.getCredentials() !== '' || this.auth.getCredentials()!== undefined)
    return this.auth.getCredentials();
    else return null;
  }
  ensurity(): boolean{ return this.isUserAuthenticated;}
  requestSellerDetails(sellerId):any{
    this.mealId = new HttpParams().set("seller__id",sellerId);
    return this.http.get(`${this.API_URL}/api/seller/menu`,{ params : this.mealId})
      .pipe(
      catchError(this.handleError)
    )
  }
  getSellerQuickData():any{
    return this.http.get(`${this.API_URL}/api/seller/dashboard/`,{headers : 
      new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Token ${this.auth.getCredentials()}`
      })
    })
      .pipe(
        catchError(this.handleError)
      )
  }
  addNewOrder(id):any{
    this.mealId.append("meal__id",id);
    return this.http.post(`${this.API_URL}/api/seller/dashboard/`,{headers : 
      new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Token ${this.auth.getCredentials()}`,
        params : this.mealId
      })
    })
      .pipe(
        catchError(this.handleError)
      )
  }
}
