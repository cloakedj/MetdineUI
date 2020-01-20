import { Component, OnInit, AfterViewInit } from '@angular/core';
import Glide from '@glidejs/glide';
import { Observer } from 'rxjs';
import { Seller } from 'src/app/entities/seller.entity';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-trending-sellers',
  templateUrl: './trending-sellers.component.html',
  styleUrls: ['./trending-sellers.component.css']
})
export class TrendingSellersComponent implements OnInit,AfterViewInit {
  getTrendingSellers$ : Observer<Seller[]>;
  trendingSellers : Seller[];
  glide :Glide;
  constructor(private api :ApiService) { 
  }

  ngOnInit() {
    this.trendingSellersFetch();
  }
  ngAfterViewInit()
  {
    console.log("loaded glide");
    this.glide = new Glide('.glide',{
      type:'slider',
      startAt : 0,
      perView : 3,
      gap: 50,
      bound: true,
    });
    this.glide.mount();
  }
  trendingSellersFetch(){
    this.getTrendingSellers$ = {
      next : data => {
        this.trendingSellers = data
      },
      error : err => console.log(err),
      complete : () => {
        this.glide.update();
        console.log(this.trendingSellers);
        console.log("Request to Trending Sellers Completed and glide reloaded")
      }
    }
    this.api.getTrendingSellers().subscribe(this.getTrendingSellers$);
  }

}
