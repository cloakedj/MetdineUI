import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from 'src/app/services/order-status/order-status.service';

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
  allActiveOrders$ : Observer<any>;
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
  listallorders = false;
  reconfirmScreen = false;
  activeOrderId : any;
  reconfirmOrder$ : Observer<any>;
  refundRecentCount : any;
  screenSize = window.screen.width;
  allActiveOrders : any;
  showBillBreakdown : boolean = false;
  completed = false;
  constructor(private api : ApiService,
    private aroute : ActivatedRoute,
    private toastr :ToastrService,
    private router : Router,
    public ordersts : OrderStatusService) {
      this.aroute.params.subscribe(params =>{
        this.activeOrderId = params["id"];
        this.getActiveOrderData();
        this.getAllActiveOrders();
      })
     }

  ngOnInit() {
    this.api.checkIfActiveOrder().subscribe(
      data => {
        this.hasActiveOrder = data["detail"];
        this.getRefundInformation();
      },
      err => this.toastr.error("Something Went Wrong. Try Again Later!")

    )
  }
  getActiveOrderData(){
    this.activeOrderData$ = {
      next : (data) => {
        this.activeOrderData = data;
        this.ordersts.getOrderStatus(this.activeOrderData.id);
        if(!this.reconfirmScreen) this.getImages();
      },
      error: (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => this.completed = true,
    }
    this.api.getSingleActiveOrderDetailsForBuyer(this.activeOrderId).subscribe(this.activeOrderData$);
  }
  getAllActiveOrders(){
    this.allActiveOrders$ = {
      next : (data) =>{
        this.allActiveOrders = data;
      },
      error : (error) => this.toastr.error("Something Went Wrong. Try Again Later!") ,
      complete : () => this.completed = true,
    }
    this.api.getActiveOrderDetailsForBuyer().subscribe(this.allActiveOrders$);
  }
  getRefundInformation(){
    this.api.checkRejectionCount().subscribe(
    (data) => this.refundRecentCount = data,
    (err) => this.toastr.error("Something Went Wrong. Try Later!")
    )
  }
  getImages(){
    this.sentImagesObs$ = {
      next : (data) => {
        this.sentImages = data[0];
        if(data[0])
        {
        if(data[0].status == 'Sent')
        this.getElapsedTime()
        if(data[0].status == 'Partial')
        this.getElapsedTimeForCall();
        if(data[0].status == 'Confirmed')
        {
        this.getActiveOrderData();
        this.reconfirmScreen = true;
        }
        }
      },
      error : (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => this.completed = true,
    }
    this.api.getConfirmationImages(this.activeOrderData.id).subscribe(this.sentImagesObs$);
  }
  getElapsedTime(){
    this.api.getElapsedTimeForImages(this.activeOrderData.confirmation).subscribe(
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
    this.api.getElapsedTimeForCall(this.activeOrderData.confirmation).subscribe(
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
      error : (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
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
      error : (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
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
    this.reconfirmOrder$ = {
      next : (data) =>
      {
        this.waitingAction = false;
        this.toastr.success("Images Accepted Successfully!!");
        this.clearTimer();
      },
      error : (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => {
        this.statusCompleted = true;
        this.getImages();
      }
    }
    this.api.reconfirmImages(this.activeOrderData.confirmation).subscribe(this.reconfirmOrder$);
  }
  toOtherActiveOrder(id : any){
    this.router.navigate(['/user',{outlets : { userRouterOutlet : ['active-order',id]}}]);
    this.listallorders = false;
  }

}
