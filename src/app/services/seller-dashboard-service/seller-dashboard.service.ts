import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService implements OnInit{

  sellerId : number;
  constructor(private api : ApiService,
    private router : Router) { 
  }
  ngOnInit() {
  }
  setSellerId(id){
    localStorage.setItem("seller__id",id);
  }
}
