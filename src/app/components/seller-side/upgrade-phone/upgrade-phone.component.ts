import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-upgrade-phone',
  templateUrl: './upgrade-phone.component.html',
  styleUrls: ['./upgrade-phone.component.css']
})
export class UpgradePhoneComponent implements OnInit {
  userDetailsObs$ : Observer<any>;
  loading : boolean = false;
  pNumber : any;
  completed = false;
  constructor(
    private router : Router,
    private toastr : ToastrService,
    private api : ApiService
  ) {
    this.userDetailsObs$ = {
      next : (data) => this.pNumber = data["phone"],
      error : err => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => this.completed = true,
    }
    this.api.getUserProfileInfo().subscribe(this.userDetailsObs$);
  }

  ngOnInit(
  ) {
  }
  registerNewNumber(){
    this.router.navigate(["/userGateway",{outlets : {userGatewayRouter : ['verify-phone']}}],
      {queryParams : {sellerSide : true}});
  }
  upgradePhone(){
    this.loading = true;
    this.api.upgradePhoneNumberForSeller().subscribe(
      (data) => {
        this.toastr.success("Phone Number Updated Successfully. Taking To Dashboard...");
        localStorage.setItem("seller_phone_verified","true");
        this.loading = false;
        this.router.navigateByUrl(`/seller-side/(sellerRouterOutlet:seller-dashboard)`);
      },
      (err) => this.toastr.error("Something Went Wrong. Please Try Again Later!")
    )
  }

}
