import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Seller } from '../../entities/seller.entity';
import { User } from '../../entities/user.entity';
import { catchError, retry, map } from 'rxjs/operators';
import {Router} from "@angular/router";
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth-service/auth-service.service';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API_URL = 'http://104.198.201.7/api';
  API_URL = 'http://f8aeb451.ngrok.io/api';
  params : HttpParams;
  private isUserAuthenticated = this.checkUserToken() ? true :false;
  constructor(private http: HttpClient,
    private router : Router,
    private Auth: AuthService,
    private toastr : ToastrService
    ) {
  }
  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }
    return throwError(
      'Something Bad Happened. Try Later'
    );
  };

  getAllSellers(lat : any,long: any):Observable<Seller[]>{
    this.params = new HttpParams().set("lat",lat.toString()).set("long",long.toString());
      return this.http.get<Seller[]>(`${this.API_URL}/seller/`,{params : this.params})
      .pipe(
        catchError(this.handleError)
      )
  }
  getSellerDetails(id): Observable<Seller>{
    return this.http.get<Seller>(`${this.API_URL}/seller/${id}/`)
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
  sellerRegistration(userData : Seller):Observable<Seller>{
    return this.http.post<Seller>(`${this.API_URL}/to_seller/`, userData)
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
  loginUserWithPhone(credentials){
    return this.http.post(`${this.API_URL}/api/user/phone/`, credentials)
    .pipe(
      catchError(this.handleError)
    )
  }
  AddUserTokenHeader(token :string){
    this.Auth.Auth_T = token;
    this.SetSellerAccountStatus();
    this.router.navigateByUrl('/user');
  }
  SetSellerAccountStatus():any {
    this.checkIfSeller().subscribe(
      (data) =>  localStorage.setItem("is_seller",data["is_seller"].toString()),
      (err) => console.log(err),
      () => console.log("checked if seller")
    )
  }
  checkUserToken():any{
    if(localStorage.getItem("Auth_Token")) return true ;
    return false;
  }
  ensurity(): boolean{ return this.isUserAuthenticated;}
  requestSellerDetails(sellerId):Observable<SellerItem[]>{
    this.params = new HttpParams().set("seller__id",sellerId);
    return this.http.get<SellerItem[]>(`${this.API_URL}/seller/menu`,{ params : this.params})
      .pipe(
      catchError(this.handleError)
    )
  }
  getSellerQuickData():any{
    return this.http.get(`${this.API_URL}/seller/dashboard/`)
      .pipe(
        catchError(this.handleError)
      )
  }
  addNewOrder(mealId : number, sellerId: number,quantity : number){
    this.params = new HttpParams().set("meal_id",mealId.toString()).set("seller_id",sellerId.toString());
    return this.http.post(`${this.API_URL}/user/cart/add/`, {quantity : quantity}, {params : this.params})
    .pipe(
        catchError(this.handleError),
      )
  }
  fetchCartDetails(): Observable<any>{
    return this.http.get(`${this.API_URL}/user/cart/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Seller Api Functions
  //Function to Get Payment History of The Seller from the API
  getSellerPaymentHistory(): Observable<any>{
    return this.http.get(`${this.API_URL}/seller/history/payment/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to get the meals offered by the seller for seller dashboard
  getSellerDashboardMeals():Observable<any>{
    return this.http.get(`${this.API_URL}/seller/meals/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to get meals offered by seller for seller dashbaord with mealID
  getSellerDashboardMealById():Observable<any>{
    return this.http.get(`${this.API_URL}/seller/menu/3/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to get All orders completed and active for the seller dashboard
  getSellerDashboardOrders(is__active :boolean, accepted : boolean, status?: number) : Observable<any>{
    this.params = is__active ? new HttpParams().set("is_active",is__active.toString()).set("accepted",accepted.toString())
    : new HttpParams().set("status",status.toString()).set("is_active",is__active.toString()).set("accepted",accepted.toString());
    return this.http.get(`${this.API_URL}/seller/orders/`,{params : this.params})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to Accept requested order by seller
  modifyRequestedOrderStatusById(orderId : number, status : number){
    return this.http.patch(`${this.API_URL}/seller/orders/actions/${orderId}/`,{status : status})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Function to reject requested order
  rejectRequestedOrderStatusById(orderId : number){
    return this.http.delete(`${this.API_URL}/seller/orders/actions/${orderId}/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to retrieve cart from API
  getUserCartDetails(){
   return  this.http.get(`${this.API_URL}/user/cart/`)
   .pipe(
     catchError(this.handleError)
   )
  }
  //Endpoint to update order quantity
  updateOrderItemQuantity(id : number,quantity : number){
    return this.http.patch(`${this.API_URL}/user/order/${id}/`, {quantity : quantity})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to delete item from cart
  deleteOrderItemById(id : number){
    return this.http.delete(`${this.API_URL}/user/order/remove/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to get order details
  getOrderDetails(orderId : string){
    return this.http.get(`${this.API_URL}/seller/order_details/${orderId}`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to add new item into cart
  additemtoCart(meal_id : number,seller_id : number){
    this.params = new HttpParams().set("meal_id",meal_id.toString()).set("seller_id",seller_id.toString());
    return this.http.post(`${this.API_URL}/user/cart/add/`,{ quantity : 1},{params : this.params})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to delete current cart
  deleteCurrentCart(){
    return this.http.delete(`${this.API_URL}/user/clear_cart/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to Complete CheckOut
  checkoutUserCart(address : any){
    return this.http.post(`${this.API_URL}/user/checkout/`,{address : address})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Get Trending Sellers
  getTrendingSellers() : Observable<Seller[]>{
    return this.http.get<Seller[]>(`${this.API_URL}/home/trending/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Check if the buyer has a seller account
  checkIfSeller():Observable<any>{
    return this.http.get(`${this.API_URL}/user/is_seller/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Add A new Item From Seller Side
  addNewItemFromSellerDashboard(item : any){
    return this.http.post(`${this.API_URL}/seller/meals/`,item)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to get single meal details
  getMealItemDetail(id : any){
    return this.http.get(`${this.API_URL}/seller/menu/${id}/`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint To Patch Meal details
  patchMealDataById(id : any,data : any){
    return this.http.patch(`${this.API_URL}/seller/menu/${id}/`,data)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Endpoint to Send pictures to buyer
  sendImagesToSeller(images : any,id: string){
    this.params = new HttpParams().set("order_id",id);
    return this.http.post(`${this.API_URL}/seller/confirm_images/`,images,{
      params : this.params
    })
    .pipe(
      catchError(this.handleError)
    )
  }
  //Get Active Order Details For Buyer
  getActiveOrderDetailsForBuyer(){
    return this.http.get(`${this.API_URL}/user/orders/active`)
    .pipe(
      catchError(this.handleError)
    )
  }
  //get images for confirmation to buyer
  getConfirmationImages(id : number){
  return this.http.get(`${this.API_URL}/user/confirmation_images/`)
  .pipe(
    catchError(this.handleError)
  )
  }
  //Reject Seller Images
  rejectSellerImages(id : any){
    return this.http.post(`${this.API_URL}/user/confirmation/reject/${id}/`,'')
    .pipe(
      catchError(this.handleError)
    )
  }
    //Accept Seller Images
    acceptSellerImages(id : any){
      return this.http.post(`${this.API_URL}/user/confirmation/confirm/${id}/`,'')
      .pipe(
        catchError(this.handleError)
      )
    }
    //Save Buyer Addresses
    saveBuyerAddress(addressData : any){
      return this.http.post(`${this.API_URL}/user/address/`,addressData)
      .pipe(
        catchError(this.handleError)
      )
    }
    //Get Buyer Addresses
    getBuyerAddress(){
      return this.http.get(`${this.API_URL}/user/address/`)
      .pipe(
        catchError(this.handleError)
      )
    }
    //Get Buyer Prevois Orders
    getBuyerPreviousOrders(){
      return this.http.get(`${this.API_URL}/user/orders/active`)
      .pipe(
        catchError(this.handleError)
      )
    }
    //Get If Buyer Has Active Order
    checkIfActiveOrder(){
      return this.http.get(`${this.API_URL}/user/active_order`)
      .pipe(
        catchError(this.handleError)
      )
    }
    //Get User Navbar Details
    getUserProfileInfo(){
      return this.http.get(`${this.API_URL}/user/profile/`)
      .pipe(
        catchError(this.handleError)
      )
    }
    //Update Seller profile information
    updateSellerProfile(data :any,id :number){
      return this.http.patch(`${this.API_URL}/seller/${id}/`,data)
      .pipe(
        catchError(this.handleError)
      )
    }
    //Update Seller Address Via MapsAPILoader
    saveSellerAddress(lat : any, long : any,address :any){
      return this.http.post(`${this.API_URL}/seller/address/`,{lat: lat,long : long,address: address})
      .pipe(
        catchError(this.handleError)
      )
    }
    //Check if phone number is verified
    checkPhoneNumberVerStatus(){
      return this.http.get(`${this.API_URL}/user/phone/status`)
      .pipe(
        catchError(this.handleError)
      )
    }
    //User get request Id
    getRequestidForOtpVerification(phoneNumber){
      return this.http.post(`${this.API_URL}/user/phone/confirm/`,{phone :phoneNumber})
      .pipe(
        catchError(this.handleError)
      )
    }
    //Otp Verification
    getOtpForVerification(data,rid){
      this.params = new HttpParams().set("request_id",rid)
      return this.http.post(`${this.API_URL}/user/phone/verify/`,data,{params : this.params})
      .pipe(
        catchError(this.handleError)
      )
    }
  //Log User Out
  logOutUser(){
    return this.http.post(`${this.API_URL}/rest-auth/logout/`,'')
    .pipe(
      catchError(this.handleError)
    )
  }

}
