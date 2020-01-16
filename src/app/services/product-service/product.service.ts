import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { Observable, throwError, Observer } from 'rxjs';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ApiService } from '../api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { find , map } from 'rxjs/operators';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products : SellerItem[];
  sellers$: Observable<Seller[]>;
  sellerId : any;
  sellerLogo : any;
  product : SellerItem;
  constructor(private api : ApiService) {
    this.getSellersDetails();
  }
  getSellersDetails():void{
    this.sellers$ = this.api.getAllSellers();
  }
  getSellerItems(id : Number){
    this.api.requestSellerDetails(this.sellerId)
    .subscribe((elem) => this.products = elem);
  }
 getSelectedItem(id: Number){
   this.product = this.products.find(elem => elem.id === id);
   return this.product;
  } 
}
