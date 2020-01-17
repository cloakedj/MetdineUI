import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit {
  sellerDetails$ : Observable<Seller>;
  constructor(
    private product : ProductService,
    private aroute : ActivatedRoute,
    private api : ApiService,
  ) { 
    this.product.sellerId = this.aroute.snapshot.paramMap.get('id');
    this.sellerDetails$ = this.api.getSellerDetails(this.product.sellerId);
  }

  ngOnInit() {
    this.product.getSellerItems(this.product.sellerId);
  }
}
