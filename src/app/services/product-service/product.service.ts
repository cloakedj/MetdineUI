import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, throwError, Observer, Subscription } from 'rxjs';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ApiService } from '../api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import { CurrLocationService } from '../curr-location/curr-location.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{
  products$ : Observable<SellerItem[]>;
  productsArr : SellerItem[];
  trendingSellers : Seller[];
  sellerId : any;
  sellerLogo : any;
  latitude: number;
  longitude: number;
  address : string;
  buyerCity : any;
  disabledPosition : boolean;
  private geoCoder;
  constructor(
    private api : ApiService,
    private maps : MapsAPILoader,
    private toastr : ToastrService) {
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
        this.getAddress(this.latitude, this.longitude);
      },this.errorCodes.bind(this));
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          results.forEach(address_component => {
            if (address_component.types[0] == "locality") {
              this.buyerCity = address_component.address_components[0].long_name;
              localStorage.setItem("city",this.buyerCity);
          }
        });
        } else {
          this.toastr.error("Something Went Wrong. Try Again Later")
        }
      } else {
        this.toastr.error("Couldn't Get Your Location.")
      }

    });
  }
  GetLocation(){
    this.maps.load().then(() => {
      this.geoCoder  = new google.maps.Geocoder;
      if(!this.address)
      this.setCurrentLocation();
    });
  }
  getSellerItems(id : number){
    this.products$ =   this.api.requestSellerDetails(id);
    this.products$.subscribe(
      data => this.productsArr = data,
      err => this.toastr.error(err),
    )
  }
  errorCodes(error){
      switch(error.code) {
        case error.PERMISSION_DENIED:
          this.disabledPosition = true;
          break;
        case error.POSITION_UNAVAILABLE:
          this.toastr.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          this.toastr.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          this.toastr.error("An unknown error occurred.")
          break;
      }
  }
}
