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
  API_URL = 'http://cc6bc0dc.ngrok.io';
  mealId;
  private isUserAuthenticated = this.checkUserToken !== null ? true :false;
  constructor(private http: HttpClient,
    private router : Router,
    private Auth: AuthService
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
  getSellerDetails(id): Observable<Seller>{
    return this.http.get<Seller>(`${this.API_URL}/api/seller/${id}/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  buyerRegistration(userData : User):Observable<User>{
    return this.http.post<User>(`${this.API_URL}/rest-auth/registration/`, userData)
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
    this.Auth.Auth_T = token;
    this.router.navigate(['/home']);
  }
  checkUserToken():any{
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
    return this.http.get(`${this.API_URL}/api/seller/dashboard/`)
      .pipe(
        catchError(this.handleError)
      )
  }
  addNewOrder(id):any{
    this.mealId.append("meal__id",id);
    return this.http.post(`${this.API_URL}/api/seller/dashboard/`,{params : this.mealId})
      .pipe(
        catchError(this.handleError)
      )
  }
}
