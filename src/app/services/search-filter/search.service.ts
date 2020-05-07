import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductService } from '../product-service/product.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  lat = localStorage.getItem("latitude") || this.product.latitude;
  long = localStorage.getItem("longitude") || this.product.longitude;
  city = localStorage.getItem("city") || this.product.buyerCity;
  constructor(private API : ApiService,
    private product : ProductService,
    private http : HttpClient) { }
  search(query : any){
    let param = new HttpParams().set("search",query).set("lat",this.lat.toString())
    .set("long",this.long.toString())
    .set("city",this.city.toString());
    return this.http.get(`${this.API.API_URL}/seller/search`,{
      params : param
    });
  }
  searchDish(query : any){
    let param = new HttpParams().set("query",query).set("lat",this.lat.toString())
    .set("long",this.long.toString())
    .set("city",this.city.toString());
    return this.http.get(`${this.API.API_URL}/meal/search/`,{
      params : param
    })
  }
}
