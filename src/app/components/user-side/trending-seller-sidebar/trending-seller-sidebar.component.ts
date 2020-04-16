import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Seller } from 'src/app/entities/seller.entity';
import { Observer } from 'rxjs';
import { TrendingSellersComponent } from '../trending-sellers/trending-sellers.component';
import { ApiService } from 'src/app/services/api-service/api.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';

@Component({
  selector: 'app-trending-seller-sidebar',
  templateUrl: './trending-seller-sidebar.component.html',
  styleUrls: ['./trending-seller-sidebar.component.css'],
  providers: [TrendingSellersComponent],
})
export class TrendingSellerSidebarComponent implements OnInit {
  trendingSellersFeed$ : Observer<Seller[]>;
  trendingSellers : Seller[];
  constructor(private product : ProductService,
    private api : ApiService,
    private gc  : GetCategoryService) { }

  ngOnInit() {
    this.trendingSellersFeed$  = {
      next : data => {
        this.trendingSellers = data
      },
      error : err => console.log(err),
      complete : () => {
        console.log("Request to Trending Sellers Completed and glide reloaded")
      }
    }
    this.api.getTrendingSellers().subscribe(this.trendingSellersFeed$);
  }

}
