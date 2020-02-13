import { Component, OnInit } from '@angular/core';
import { fader } from 'src/app/animations/route-animation';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';

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
  constructor(private api : ApiService,
    private router : Router) {
    this.userDetailsObs$ = {
      next : (data) => this.userProfileData = data,
      error : err => console.log(err),
      complete : () => console.log("Completed request to user profile")
    }
    this.api.getUserProfileInfo().subscribe(this.userDetailsObs$);
   }

  ngOnInit() {
  }
  logUserOut(){
    this.api.logOutUser()
    .subscribe(
      data => console.log("Logged Out"),
      err => console.log(err),
      () => 
      {
        localStorage.clear();
        this.router.navigateByUrl('/userGateway/(userGatewayRouter:login)');
        console.log("Logged out Successfully!");
      }
    )
    }

}
