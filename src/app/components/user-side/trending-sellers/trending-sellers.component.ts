import { Component, OnInit, AfterViewInit } from '@angular/core';
import Glide from '@glidejs/glide';
import { Observer } from 'rxjs';
import { Seller } from 'src/app/entities/seller.entity';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-trending-sellers',
  templateUrl: './trending-sellers.component.html',
  styleUrls: ['./trending-sellers.component.css']
})
export class TrendingSellersComponent implements OnInit,AfterViewInit{
  getTrendingSellers$ : Observer<Seller[]>;
  glide : Glide;
  constructor(private api :ApiService,
    public product : ProductService) { 
      this.trendingSellersFetch();
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.mountGlide();
  }
  trendingSellersFetch(){
    this.getTrendingSellers$ = {
      next : data => {
        this.product.trendingSellers = data;
      },
      error : err => console.log(err),
      complete : () => {
        console.log("Request to Trending Sellers Completed and glide reloaded")
      }
    }
    this.api.getTrendingSellers().subscribe(this.getTrendingSellers$);
  }
  mountGlide(){
    this.glide = new Glide('.glide',{
      type:'slider',
      startAt : 0,
      perView : 3,
      gap: 50,
    });
    this.glide.mount();
  }

}
