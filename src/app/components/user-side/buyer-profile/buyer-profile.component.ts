import { Component, OnInit } from '@angular/core';
import { fader } from 'src/app/animations/route-animation';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.css'],
  animations: [
    fader,
  ]
})
export class BuyerProfileComponent implements OnInit {
  userDetailsObs$ : Observer<any>;
  userProfileData : any;
  numberVerified : any;
  constructor(private api : ApiService,
    private router : Router,
    private toastr : ToastrService,
    private Auth :AuthService) {
    this.userDetailsObs$ = {
      next : (data) => this.userProfileData = data,
      error : err => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => console.log("Completed request to user profile")
    }
    this.api.getUserProfileInfo().subscribe(this.userDetailsObs$);
   }

  ngOnInit() {
  }
  checkPhoneStatus(){
    this.api.checkPhoneNumberVerStatus().subscribe(
      data =>this.numberVerified = data,
      err => console.log(err)
    )
  }
  verifyPhone(){
    this.router.navigateByUrl(`/userGateway/(userGatewayRouter:verify-phone)`);
  }
  logUserOut(){
    this.api.logOutUser()
    .subscribe(
      data =>
      {
        this.toastr.success("Logged Out Successfully");
        let randId = Math.random() * 2510;
        this.router.navigate(['/userGateway',{outlets : {userGatewayRouter : ['login']}}],{queryParams : {logOutId : randId}});
      },
      err => this.toastr.error(err),
    )
    }

}
