import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.css']
})
export class SellerSidebarComponent implements OnInit {
  sellerData$ : Observer<any>;
  sellerData : any;
  @Output() hideMenu : EventEmitter<boolean> = new EventEmitter();
  @HostListener('click',['$event'])
  onClick(evt){
    if(evt.target.className == "ui header")
    this.hideMenu.emit(true);
  }
  constructor(
    private api : ApiService,
    private router : Router,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.sellerData$ = {
      next: (data) => {
        this.sellerData = data;
      },
      error: (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete: () => console.log("Completed")
    };
    this.api.getSellerQuickData().subscribe(this.sellerData$);
  }
  removeCookie(){
    if (localStorage.getItem("seller_mode_active")) localStorage.removeItem("seller_mode_active");
  }
  logUserOut(){
    this.api.logOutUser()
    .subscribe(
      data => this.toastr.success("Logged Out Successfully."),
      err => this.toastr.error("Something Went Wrong. Try Again Later!"),
      () =>
      {
        localStorage.clear();
        this.router.navigateByUrl('/userGateway/(userGatewayRouter:login)');
      }
    )
    }

}
