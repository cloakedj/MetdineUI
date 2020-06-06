import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Seller } from 'src/app/entities/seller.entity';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trending-seller-sidebar',
  templateUrl: './trending-seller-sidebar.component.html',
  styleUrls: ['./trending-seller-sidebar.component.css'],
})
export class TrendingSellerSidebarComponent implements OnInit {
  trendingSellersFeed$ : Observer<Seller[]>;
  trendingSellers : Seller[];
  completed = false;
  constructor(private product : ProductService,
    private api : ApiService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.trendingSellersFeed$  = {
      next : data => {
        this.trendingSellers = data
      },
      error : err => this.toastr.error(err),
      complete : () => this.completed = true,
    }
    let lat = localStorage.getItem("latitude") || this.product.latitude;
    let long = localStorage.getItem("longitude") || this.product.longitude;
    let city = localStorage.getItem("city") || this.product.buyerCity;
    this.api.getTrendingSellers(lat,long,city).subscribe(this.trendingSellersFeed$);
  }

}
