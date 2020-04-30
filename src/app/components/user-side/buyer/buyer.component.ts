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
  messageVisible = false;
  isLoggedIn = localStorage.getItem("Auth_Token") ? true : false;
  constructor(
    private api : ApiService,
    private toastr : ToastrService,
    private router : Router,
  ) { }

  ngOnInit() {
    if(!localStorage.getItem("buyer-phone-status"))
    {
    this.api.checkPhoneNumberVerStatus().subscribe(
      data => {
        this.numberVerified = data;
        localStorage.setItem("buyer-phone-status",data.toString());
        if(!this.numberVerified)
        this.messageVisible = true;
      },
      err => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
    }
    else{
      if(localStorage.getItem("buyer-phone-status") == "false")
      this.messageVisible = true;
    }
  }
  switchMessage(){
    this.messageVisible = false;
  }
  verifyPhone(){
    this.router.navigateByUrl(`/userGateway/(userGatewayRouter:verify-phone)`);
  }

}
