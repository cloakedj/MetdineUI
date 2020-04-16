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
  sentImages : any;
  hideMessage = false;
  imageStatusObs$ : Observer<any>;
  statusCompleted = false;
  timeLeft = 120;
  waitingAction = false;
  startTimer : any;
  screenSize = window.screen.width;
  constructor(private api : ApiService,
    private gc : GetCategoryService,
    private toastr :ToastrService) { }

  ngOnInit() {
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
        this.getImages();
        this.clearTimer();
      },
      error : (err) => this.toastr.error(err),
      complete : () => {
        this.statusCompleted = true
        this.api.getConfirmationImages(this.activeOrderData[0].id).subscribe(this.sentImagesObs$);
      }
    }
    this.api.acceptSellerImages(id).subscribe(this.statusimagesObs$);  
  }
  rejectImages(id : any){
    this.waitingAction = true;
    this.api.rejectSellerImages(id).subscribe(this.statusimagesObs$); 
    this.api.getConfirmationImages(this.activeOrderData[0].id).subscribe(this.sentImagesObs$);
     
  }
  clearTimer(){
    clearInterval(this.startTimer);
  }

}
