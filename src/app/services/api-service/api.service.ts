import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../../entities/seller.entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://f92e6971.ngrok.io';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  constructor(private http: HttpClient) { 
  }
  getAllSellers():Observable<Seller[]>{
      return this.http.get<Seller[]>(`${this.API_URL}/api/seller/` ,
      { headers : this.httpHeaders});
  }
}
