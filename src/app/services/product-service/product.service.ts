import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, throwError, Observer, Subscription } from 'rxjs';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ApiService } from '../api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{
  products$ : Observable<SellerItem[]>; 
  productsArr : SellerItem[];
  sellers$: Observable<Seller[]>;
  trendingSellers : Seller[];
  sellerId : any;
  sellerLogo : any;
  constructor(private api : ApiService) {
    this.getSellersDetails();
  }
  ngOnInit(){
  }
  getSellersDetails():void{
    this.sellers$ = this.api.getAllSellers();
  }
  getSellerItems(id : number){
    this.products$ =   this.api.requestSellerDetails(id);
    this.products$.subscribe(
      data => this.productsArr = data,
      err => console.log(err),
      () => console.log("Products Fetched To Cart")
    )
  } 
}
