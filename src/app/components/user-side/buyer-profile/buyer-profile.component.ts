import { Component, OnInit } from '@angular/core';
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
})
export class BuyerProfileComponent implements OnInit {
  userDetailsObs$ : Observer<any>;
  userProfileData : any;
  numberVerified : any;
  completed = false;
  constructor(private api : ApiService,
    private router : Router,
    private toastr : ToastrService,
    private Auth :AuthService) {
    this.userDetailsObs$ = {
      next : (data) => this.userProfileData = data,
      error : err => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => this.completed = true,
    }
    this.api.getUserProfileInfo().subscribe(this.userDetailsObs$);
   }

  ngOnInit() {
  }
  checkPhoneStatus(){
    this.api.checkPhoneNumberVerStatus().subscribe(
      data =>this.numberVerified = data,
      err => this.toastr.error(err)
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
        // let randId = Math.random() * 2510;
        localStorage.clear();
        this.router.navigate(['/userGateway',{outlets : {userGatewayRouter : ['login']}}]);
      },
      err => this.toastr.error(err),
    )
    }

}
