import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Seller } from '../../entities/seller.entity';
import { User } from '../../entities/user.entity';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://83c7e284.ngrok.io';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  constructor(private http: HttpClient) { 
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
      return this.http.get<Seller[]>(`${this.API_URL}/api/seller/` ,
      { headers : this.httpHeaders});
  }
  buyerRegistration(userData : User):Observable<User>{
    return this.http.post<User>(`${this.API_URL}/rest-auth/registration/`, userData , 
    {headers :this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  loginUser(credentials){
    return this.http.post(`${this.API_URL}/rest-auth/login/`, credentials,{headers : this.httpHeaders})
    .subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }
  checkUserToken(res: Response):boolean{
    // if(res["key"])
    // {
    // console.log(res["key"]);
    // this.httpHeaders.append("AuthToken",res["key"])
    // return true;
    // }
    return false; 
  }
}
