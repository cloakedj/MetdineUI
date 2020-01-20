import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Seller } from '../../entities/seller.entity';
import { User } from '../../entities/user.entity';
import { catchError, retry } from 'rxjs/operators';
import {Router} from "@angular/router";
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth-service/auth-service.service';
import { SellerItem } from 'src/app/entities/seller-item.entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://192.168.1.104:325';
  params : HttpParams;
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
  requestSellerDetails(sellerId):Observable<SellerItem[]>{
    this.params = new HttpParams().set("seller__id",sellerId);
    return this.http.get<SellerItem[]>(`${this.API_URL}/api/seller/menu`,{ params : this.params})
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
  addNewOrder(mealId : Number, sellerId: Number,quantity : number){
    this.params = new HttpParams().set("meal_id",mealId.toString()).set("seller_id",sellerId.toString());
    return this.http.post(`${this.API_URL}/api/user/cart/add/`, {quantity : quantity}, {params : this.params}) 
    .pipe(
        catchError(this.handleError),
      )
  }
  fetchCartDetails(): Observable<any>{
    return this.http.get(`${this.API_URL}/api/user/cart/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Seller Api Functions
  //Function to Get Payment History of The Seller from the API
  getSellerPaymentHistory(): Observable<any>{
    return this.http.get(`${this.API_URL}/api/seller/history/payment/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to get the meals offered by the seller for seller dashboard
  getSellerDashboardMeals():Observable<any>{
    return this.http.get(`${this.API_URL}/api/seller/meals/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to get meals offered by seller for seller dashbaord with mealID
  getSellerDashboardMealById():Observable<any>{
    return this.http.get(`${this.API_URL}/api/seller/menu/3/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to get All orders completed and active for the seller dashboard
  getSellerDashboardOrders(is__active :boolean, accepted : boolean, status?: number) : Observable<any>{
    this.params = is__active ? new HttpParams().set("is_active",is__active.toString()).set("accepted",accepted.toString())
    : new HttpParams().set("status",status.toString()).set("is_active",is__active.toString()).set("accepted",accepted.toString());
    return this.http.get(`${this.API_URL}/api/seller/orders/`,{params : this.params})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to Accept requested order by seller
  modifyRequestedOrderStatusById(orderId : number, status : number){
    return this.http.patch(`${this.API_URL}/api/seller/orders/actions/${orderId}/`,{status : status})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to reject requested order
  rejectRequestedOrderStatusById(orderId : number){
    return this.http.delete(`${this.API_URL}/api/seller/orders/actions/${orderId}/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to etreive cart from API
  getUserCartDetails(){
   return  this.http.get(`${this.API_URL}/api/user/cart/`)
   .pipe(
     catchError(this.handleError)
   )
  }
  //Endpoint to update order quantity
  updateOrderItemQuantity(id : Number,quantity : number){
    return this.http.patch(`${this.API_URL}/api/user/order/${id}/`, {quantity : quantity})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to delete item from cart
  deleteOrderItemById(id : Number){
    return this.http.delete(`${this.API_URL}/api/user/order/${id}/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to add new item into cart
  additemtoCart(meal_id : Number,seller_id : number){
    this.params = new HttpParams().set("meal_id",meal_id.toString()).set("seller_id",seller_id.toString());
    return this.http.post(`${this.API_URL}/api/user/cart/add/`,{ quantity : 1},{params : this.params})
    .pipe(         
      catchError(this.handleError)
    )
  }
  //Endpoint to delete current cart
  deleteCurrentCart(){
    return this.http.delete(`${this.API_URL}/api/user/cart/`)
    .pipe(
      catchError(this.handleError)
    )
  }
}
