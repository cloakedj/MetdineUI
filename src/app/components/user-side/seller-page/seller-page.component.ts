import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit,AfterViewInit{
  sellerDetails$ : Observable<Seller>;
  private sellerLogo : string;
  constructor(
    private product : ProductService,
    private aroute : ActivatedRoute,
    private api : ApiService,
    private cart : CartService
  ) { 
    let sid = this.aroute.snapshot.paramMap.get('id');
    this.product.sellerId = sid;
    this.product.sellerLogo = this.sellerLogo;
    this.sellerDetails$ = this.api.getSellerDetails(this.product.sellerId);
  }

  ngOnInit() {
    this.product.getSellerItems(this.product.sellerId);
  }
  ngAfterViewInit(){
  }
}
