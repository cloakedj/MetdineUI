import { Injectable } from '@angular/core';
import { ProductService } from '../product-service/product.service';

@Injectable({
  providedIn: 'root'
})
export class CurrLocationService {
  latitude : any;
  longitude : any;
  address : any;
  constructor(
    private product : ProductService
  ) { }
  setLatLong(lat : any,long : any){
    this.latitude = lat;
    this.longitude = long;
    localStorage.setItem("latitude",this.latitude.toString());
    localStorage.setItem("longitude",this.longitude.toString());
  }
  setAddressAndCity(address : any,city ?: any){
    this.address = address;
    this.product.address = this.address;
    localStorage.setItem("city",city);
  }
}
