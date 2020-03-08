import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  constructor(private API : ApiService,
    private http : HttpClient) { }
  search(query : any){
    let param = new HttpParams().set("search",query);
    return this.http.get(`${this.API.API_URL}/seller/search`,{
      params : param
    });
  }
  searchDish(query : any){
    let param = new HttpParams().set("query",query);
    return this.http.get(`${this.API.API_URL}/meal/search/`,{
      params : param
    })
  }
}
