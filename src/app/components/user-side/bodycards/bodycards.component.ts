import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Seller } from '../../../entities/seller.entity';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ToastrService } from 'ngx-toastr';
import { CurrLocationService } from 'src/app/services/curr-location/curr-location.service';

@Component({
  selector: 'app-bodycards',
  templateUrl: './bodycards.component.html',
  styleUrls: ['./bodycards.component.css']
})
export class BodycardsComponent implements OnInit {
  readonly maxRetries = 7;
  tryCount = 0;
  showMaxRetryErrorCode : boolean = false;
  public sellers : any;
  public sellers$ : any;
  public sellersArr : any;
  checkLocationAgainTime : any;
  isSeller  = localStorage.getItem("is_seller") ? localStorage.getItem("is_seller") : "true";
  constructor(private api:ApiService,
    public product : ProductService,
    private router : Router,
    private toastr : ToastrService,
    private currlc : CurrLocationService
    ) {
      this.product.GetLocation();
    }

  ngOnInit() {
    this.checkLocationAgainTime = setInterval(() =>{
    if(this.product.disabledPosition)
    {
      this.showMaxRetryErrorCode = true;
      this.clearTime();
    }
    else
    {
    if(this.tryCount === this.maxRetries)
    {
      this.showMaxRetryErrorCode = true;
      this.clearTime();
    }
    else{
    if(localStorage.getItem("Auth_Token") &&
    ((localStorage.getItem("latitude") && localStorage.getItem("longitude") && localStorage.getItem("city"))
    || (this.product.latitude !== undefined && this.product.longitude !== undefined && this.product.buyerCity !== undefined)
    || (this.currlc.latitude !== undefined && this.currlc.longitude !== undefined && this.currlc.address !== undefined)))
    {
    let lat = localStorage.getItem("latitude") || this.product.latitude || this.currlc.latitude;
    let long = localStorage.getItem("longitude") || this.product.longitude || this.currlc.longitude;
    let city = localStorage.getItem("city") || this.product.buyerCity || this.currlc.city;
    this.api.getAllSellers(lat,long,city).subscribe(
      data =>{
        this.sellersArr = data;
        if (this.showMaxRetryErrorCode) this.showMaxRetryErrorCode = false;
        this.clearTime();
      } ,
      err => this.toastr.info("Something Went Wrong. Retrying!"),
    )
    }
    this.tryCount++;
    }
    }
    },5000);
  }
  openMap(){
    this.router.navigateByUrl('/map');
  }
  becomeASeller(){
    this.router.navigate(['/becomeSeller']);
  }
  clearTime(){
    clearInterval(this.checkLocationAgainTime);
    this.tryCount = 0;
  }
}
