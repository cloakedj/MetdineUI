import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';

@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.css']
})
export class ActiveOrderComponent implements OnInit {
  activeOrderData$ : Observer<any>;
  activeOrderData : any;
  showReconfirmLoader = false;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' },
    { key: 5, value : 'Waiting'},
    { key : 6, value : 'Cancelled'}
  ];
  sentImagesObs$ : Observer<any>;
  statusimagesObs$ : Observer<any>;
  statusimagesRejectObs$ : Observer<any>;
  sentImages : any;
  hideMessage = false;
  imageStatusObs$ : Observer<any>;
  statusCompleted = false;
  timeLeft : number;
  waitingAction = false;
  hasActiveOrder : boolean;
  startTimer : any;
  screenSize = window.screen.width;
  constructor(private api : ApiService,
    private gc : GetCategoryService,
    private toastr :ToastrService) { }

  ngOnInit() {
    this.api.checkIfActiveOrder().subscribe(
      data => {
        this.hasActiveOrder = data["detail"];
        if(this.hasActiveOrder)
        this.getActiveOrderData();
      },
      err => this.toastr.error("Something Went Wrong. Try Again Later!")

    )
  }
  getActiveOrderData(){
    this.activeOrderData$ = {
      next : (data) => {
        this.activeOrderData = data;
        this.getImages();
      },
      error: (err) => this.toastr.error(err),
      complete : () => console.log("Request Completed")
    }
    this.api.getActiveOrderDetailsForBuyer().subscribe(this.activeOrderData$);
  }
  getImages(){
    this.sentImagesObs$ = {
      next : (data) => {
        this.sentImages = data;
        if(data[0].status == 'Sent')
        this.getElapsedTime()
        if(data[0].status == 'Partial')
        this.getElapsedTimeForCall();
        if(data[0].status == 'Comfirmed')
        this.getActiveOrderData();
      },
      error : (err) => this.toastr.error(err),
      complete : () => console.log("Request comleted")
    }
    this.api.getConfirmationImages(this.activeOrderData[0].id).subscribe(this.sentImagesObs$);
  }
  getElapsedTime(){
    this.api.getElapsedTimeForImages(this.activeOrderData[0].confirmation).subscribe(
      (data) => {
        if(data["elapsed"] == 121)
        {
        this.toastr.info("Time To Accept Images Has Expired. The Order Was Accepted Automatically");
        this.getImages();
        }
        else
        {
        this.timeLeft = 120 - data["elapsed"];
        this.startTimer =  setInterval(()=>{
          if(this.timeLeft > 0)
          {
          this.timeLeft--;
          }
          else
          {
          this.toastr.info("Time To Accept Images Has Expired. The Order Was Accepted Automatically");
          this.getImages();
          this.clearTimer();
          }
        }
        ,1000)
        }
      },
      (error) => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
  }
  getElapsedTimeForCall(){
    this.api.getElapsedTimeForCall(this.activeOrderData[0].confirmation).subscribe(
      (data) => {
        if(data["elapsed"] == 181)
        {
        this.toastr.info("Time To Accept Images Has Expired. The Order Has Been Rejected.");
        this.getImages();
        }
        else
        {
        this.timeLeft = 180 - data["elapsed"];
        this.startTimer =  setInterval(()=>{
          if(this.timeLeft > 0)
          {
          this.timeLeft--;
          }
          else
          {
          this.toastr.info("Time To Accept Images Has Expired. The Order Has Been Rejected.");
          this.getImages();
          this.clearTimer();
          }
        }
        ,1000)
        }
      },
      (error) => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
  }
  getStatus(id : any){
    let val;
    this.orderStatusFilter.forEach((arr,k,v)=>{
      if(id == arr.key) val = arr.value;
    });
    return val;
  }
  acceptImages(id : any){
    this.waitingAction = true;
    this.statusimagesObs$ = {
      next : (data) =>
      {
        this.waitingAction = false;
        this.toastr.success("Images Accepted Successfully!!");
        this.clearTimer();
      },
      error : (err) => this.toastr.error(err),
      complete : () => {
        this.statusCompleted = true;
        this.getImages();
      }
    }
    this.api.acceptSellerImages(id).subscribe(this.statusimagesObs$);
  }
  rejectImages(id : any){
    this.waitingAction = true;
    this.statusimagesRejectObs$ = {
      next : (data) =>
      {
        this.waitingAction = false;
        this.toastr.success("Images Rejected Successfully!!");
        this.clearTimer();
      },
      error : (err) => this.toastr.error(err),
      complete : () => {
        this.statusCompleted = true;
        this.getImages();
      }
    }
    this.api.rejectSellerImages(id).subscribe(this.statusimagesRejectObs$);
  }
  clearTimer(){
    clearInterval(this.startTimer);
  }
  reconfirmOrder(){
    this.api.reconfirmImages(this.activeOrderData[0].confirmation).subscribe(this.statusimagesObs$);
    this.getImages();
  }

}
