import { Component, OnInit } from '@angular/core';
import { fader } from 'src/app/animations/route-animation';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';

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
  constructor(private api : ApiService) {
    this.userDetailsObs$ = {
      next : (data) => this.userProfileData = data,
      error : err => console.log(err),
      complete : () => console.log("Completed request to user profile")
    }
    this.api.getUserProfileInfo().subscribe(this.userDetailsObs$);
   }

  ngOnInit() {
  }

}
