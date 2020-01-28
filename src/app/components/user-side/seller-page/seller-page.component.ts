import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';
import { SellerItem } from 'src/app/entities/seller-item.entity';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit,AfterViewInit{
  sellerDetails$ : Observable<Seller>;
  sellerLogo : string;
  backUpProducts : SellerItem[];
  constructor(
    private product : ProductService,
    private aroute : ActivatedRoute,
    private api : ApiService,
    private cart : CartService,
    private gc : GetCategoryService
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
  getCategory(id: any){
    return id !== 'No meals yet' ? this.gc.returnCategory(id) : 'No meals yet';
  }
  filterByVegItems(){
    console.log(this.backUpProducts);
    if(!this.backUpProducts)
    {
    this.backUpProducts = this.product.productsArr;
    console.log(this.backUpProducts);
    this.product.productsArr = this.product.productsArr.filter(elem => elem.is_veg);
    }
    else {
      this.product.productsArr = this.backUpProducts;
      this.backUpProducts = undefined;
    }
  }
}
