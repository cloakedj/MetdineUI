import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, throwError, Observer, Subscription } from 'rxjs';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ApiService } from '../api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{
  products$ : Observable<SellerItem[]>;
  productsArr : SellerItem[];
  sellers$: Observable<Seller[]>;
  sellersArr : Seller[];
  trendingSellers : Seller[];
  sellerId : any;
  sellerLogo : any;
  latitude: number;
  longitude: number;
  address : string;
  private geoCoder;
  constructor(
    private api : ApiService,
    private maps : MapsAPILoader,
    private toastr : ToastrService) {
      this.GetLocation();
  }
  ngOnInit(){
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.setItem("latitude",this.latitude.toString());
        localStorage.setItem("longitude",this.longitude.toString());
        this.sellers$ = this.api.getAllSellers(this.latitude,this.longitude);
        this.api.getAllSellers(this.latitude,this.longitude).subscribe(
          data => this.sellersArr = data,
          err => this.toastr.error("Something Went Wrong. Please Try Again Later."),
        )
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          this.toastr.error("Something Went Wrong.")
        }
      } else {
        this.toastr.error("Couldn't Get Your Location.")
      }

    });
  }
  GetLocation(){
    this.maps.load().then(() => {
      this.geoCoder  = new google.maps.Geocoder;
      this.setCurrentLocation();
    });
  }
  getSellerItems(id : number){
    this.products$ =   this.api.requestSellerDetails(id);
    this.products$.subscribe(
      data => this.productsArr = data,
      err => console.log(err),
      () => console.log("Products Fetched To Cart")
    )
  }
}
