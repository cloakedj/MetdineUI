import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observer } from 'rxjs';
import Swiper from 'swiper';
import { Seller } from 'src/app/entities/seller.entity';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-trending-sellers',
  templateUrl: './trending-sellers.component.html',
  styleUrls: ['./trending-sellers.component.css']
})
export class TrendingSellersComponent implements OnInit{
  getTrendingSellers$ : Observer<Seller[]>;
  prop = {
    observable : true
  };
  swiper : Swiper;
  constructor(private api :ApiService,
    public product : ProductService) {
      this.trendingSellersFetch();
  }

  ngOnInit() {
    this.swiper = new Swiper('.swiper-container', {
      effect:'cube',
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  trendingSellersFetch(){
    // this.getTrendingSellers$ = {
    //   next : data => {
    //     this.product.trendingSellers = data;
    //   },
    //   error : err => console.log(err),
    //   complete : () => {
    //     this.swiper.init();
    //     console.log("Request to Trending Sellers Completed and glide reloaded")
    //   }
    // }
    // this.api.getTrendingSellers().subscribe(this.getTrendingSellers$);
  }
}
