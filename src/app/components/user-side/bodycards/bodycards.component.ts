import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Seller } from '../../../entities/seller.entity';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';
import { ToastrService } from 'ngx-toastr';

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
    private gc : GetCategoryService,
    private router : Router,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.checkLocationAgainTime = setInterval(() =>{
    if(this.tryCount === this.maxRetries)
    {
      this.showMaxRetryErrorCode = true;
      this.clearTime();
    }
    else{
    if(localStorage.getItem("Auth_Token") && localStorage.getItem("latitude") && localStorage.getItem("longitude") && localStorage.getItem("city"))
    {
    this.clearTime();
    this.sellers$ = this.api.getAllSellers();
    this.api.getAllSellers().subscribe(
      data =>{
        this.sellersArr = data;
      } ,
      err => this.toastr.error("Something Went Wrong. Try Again Later!"),
    )
    }
    this.tryCount++;
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
