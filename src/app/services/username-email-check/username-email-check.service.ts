import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsernameEmailCheckService {

  constructor(
    private API : ApiService,
    private http : HttpClient
  ) { }
  searchUsername(query : any){
    let param = new HttpParams().set("email",query);
    return this.http.get(`${this.API.API_URL}/check/email`,{
      params : param
    });
  }
  searchEmail(query : any){
    let param = new HttpParams().set("username",query);
    return this.http.get(`${this.API.API_URL}/check/username`,{
      params : param
    });
  }
}
