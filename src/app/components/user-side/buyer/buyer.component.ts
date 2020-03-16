import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  numberVerified : any;
  messageVisible = true;
  constructor(
    private api : ApiService,
    private toastr : ToastrService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.api.checkPhoneNumberVerStatus().subscribe(
      data => {
        console.log(data);
        this.numberVerified = data;
      },
      err => this.toastr.error("Something Went Wrong. Please Try Again.")
    )
  }
  switchMessage(){
    this.messageVisible = false;
  }
  verifyPhone(){
    this.router.navigateByUrl(`/userGateway/(userGatewayRouter:verify-phone)`);
  }

}
