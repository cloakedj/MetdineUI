import { Component, OnInit } from '@angular/core';
import { fader } from 'src/app/animations/route-animation';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.css'],
  animations: [
    fader,
  ]
})
export class BuyerProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
