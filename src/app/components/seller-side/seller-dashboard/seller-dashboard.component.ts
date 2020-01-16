import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observable } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  sellerData : any[];
  constructor(private api : ApiService) { 
  }
  ngOnInit() {
   this.api.getSellerQuickData()
    .subscribe(
      (data) =>this.sellerData = data,
      (err) => console.log(err),
      () => console.log("Request Completed")
    )
  }
}
