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
  products$ : Subscription; 
  sellers$: Observable<Seller[]>;
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
    this.products$ = this.api.requestSellerDetails(id)
    .subscribe(
      (elem) => {this.products = elem},
      (err) => console.log(err),
      () => console.log("request Completed")
      );
  }
 getSelectedItem(id: Number){
   this.product = this.products.find(elem => elem.id === id);
   return this.product;
  } 
  ngOnDestroy(){
    console.log("service terminated")
  }
}
