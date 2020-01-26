import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, throwError, Observer, Subscription } from 'rxjs';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ApiService } from '../api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit,OnDestroy{
  private products : SellerItem[];
  products$ : Observable<SellerItem[]>; 
  sellers$: Observable<Seller[]>;
  trendingSellers : Seller[];
  sellerId : any;
  sellerLogo : any;
  product : SellerItem;
  constructor(private api : ApiService) {
    this.getSellersDetails();
  }
  ngOnInit(){
  }
  getSellersDetails():void{
    this.sellers$ = this.api.getAllSellers();
  }
  getSellerItems(id : Number){
    this.products$ =   this.api.requestSellerDetails(id);
  } 
  ngOnDestroy(){
  }
}
