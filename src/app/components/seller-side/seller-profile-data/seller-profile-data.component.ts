import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observer } from 'rxjs';
import { SellerDash } from 'src/app/entities/seller-dash.entity';
import { ApiService } from 'src/app/services/api-service/api.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

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
  showPaymentInfoModal = false;
  sellerPaymentInfo : any;
  sellerDetails = this._fb.group({
    first_name : [''],
    last_name : [''],
    address : ['']
  });
  imageUpdated : boolean = false;
  updateSellerInfo$ : Observer<any>;
  editedSellerInfo = new FormData();
  constructor(private api: ApiService,
    private router : Router,
    private _fb : FormBuilder,
    private toastr :ToastrService,
    private filesUpload : KeepFilesService,
    private cd : ChangeDetectorRef) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.getSellerInfo();
    this.api.getSellerDashboardOrders(false, false, 4)
    .subscribe(this.sellerCompletedOrdersForDashboard$);
  }
  getSellerInfo(){
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
  }
  getItemsLength(){
    if ( this.sellerCompletedOrders === undefined ||
      this.sellerCompletedOrders.length === 0) return false;
      return true;
  }
  updateSellerDetails(){
    if(this.imageUpdated)
    this.editedSellerInfo.append("logo",this.filesUpload.Files[0])
    this.sellerDetails['_forEachChild']((control,name)=>{
      if(control.dirty){
        this.editedSellerInfo.append(name.toString(),control.value);
      }
    });
    this.updateSellerInfo$ = {
      next : data => {
        this.toastr.success("Profile Updated Successfully. Refresh The Page To View The Changes.");
      },
      error : err => this.toastr.error("Something Went Wrong. Try Again!"),
      complete : () => this.getSellerInfo()
    }
    this.api.updateSellerProfile(this.editedSellerInfo,this.sellerDashOptions.id).subscribe(this.updateSellerInfo$);
  }
  toCompletedOrders(){
    this.router.navigateByUrl(`/seller-side/(sellerRouterOutlet:completed-orders)`);
  }
  updatePhone(){
    this.router.navigate(["/userGateway",{outlets : {userGatewayRouter : ['verify-phone']}}],
    {queryParams : {sellerSide : true}});
  }
  updatePaymentInfo(){
    this.router.navigate(['/seller-side',{outlets : {sellerRouterOutlet : ['seller-payment-info']}}],
    {queryParams : {updateMode : this.sellerPaymentInfo.id}});
  }
  showPaymentData(){
    this.showPaymentInfoModal = true;
    this.api.getSellerPaymentInfo().subscribe(
      (data) => this.sellerPaymentInfo = data,
      (err) => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
  }
  uploadFile(event) {
    for (let index = 0; index < event.target.files.length; index++) {
    const element = event.target.files[index];
    const reader = new FileReader();
        reader.readAsDataURL(event.target.files[index]);
        reader.onload = () => {
          this.filesUpload.getUploadFile(reader.result);
          this.cd.markForCheck();
      }
    }
    this.imageUpdated = true;
    }

}
