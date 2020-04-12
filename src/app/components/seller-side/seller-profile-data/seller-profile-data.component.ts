import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { ApiService } from 'src/app/services/api-service/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-seller-profile-data',
  templateUrl: './seller-profile-data.component.html',
  styleUrls: ['./seller-profile-data.component.css']
})
export class SellerProfileDataComponent implements OnInit {
  sellerData$ : Observer<any>;
  sellerDashOptions: SellerDash;
  sellerCompletedOrdersForDashboard$: Observer<any>;
  sellerCompletedOrders : any[];
  editDetailsShow = false;
  editAddress = false;
  windowWidth  : number;
  sellerDetails = this._fb.group({
    first_name : [''],
    last_name : [''],
    phone : [''],
    address : ['']
  });
  updateSellerInfo$ : Observer<any>;
  editedSellerInfo = new FormData();
  constructor(private api: ApiService,
    private router : Router,
    private _fb : FormBuilder) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.sellerData$ = {
      next: (data) => {
        this.sellerDashOptions = data;
      },
      error: (err) => console.log(err),
      complete: () => console.log("Request completed")
    };
    this.sellerCompletedOrdersForDashboard$ = {
      next: (data) => this.sellerCompletedOrders = data.splice(0,2),
      error: (err) => console.log(err),
      complete: () => console.log("Request for seller orders completed")
    }
    this.api.getSellerQuickData().subscribe(this.sellerData$);
    this.api.getSellerDashboardOrders(false, false, 4)
    .subscribe(this.sellerCompletedOrdersForDashboard$);
  }
  getItemsLength(){
    if ( this.sellerCompletedOrders === undefined || 
      this.sellerCompletedOrders.length === 0) return false;
      return true;
  }
  updateSellerDetails(){
    this.sellerDetails['_forEachChild']((control,name)=>{
      if(control.dirty){
        this.editedSellerInfo.append(name.toString(),control.value);
      }
    });
    this.updateSellerInfo$ = {
      next : data => console.log("Request Started"),
      error : err => console.log(err),
      complete : () => this.api.getSellerQuickData().subscribe(this.sellerData$)
    }
    this.api.updateSellerProfile(this.editedSellerInfo,this.sellerDashOptions.id).subscribe(this.updateSellerInfo$);
  }
  toCompletedOrders(){
    this.router.navigateByUrl(`/seller-side/(sellerRouterOutlet:completed-orders)`);
  }

}
