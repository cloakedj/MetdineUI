import { KeepFilesService } from './../../../services/upload-files/keep-files.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { timer, Observer, Subject, Observable, of } from 'rxjs'

@Component({
  selector: 'app-confirm-order-pics',
  templateUrl: './confirm-order-pics.component.html',
  styleUrls: ['./confirm-order-pics.component.css']
})
export class ConfirmOrderPicsComponent implements OnInit, OnDestroy{
  orderId: any;
  orderDetails$: Observer<any>;
  @Input() orderDetails: any;
  uploadImagesObs$ : Observer<any>;
  imagesSent : any;
  imageConfirmationId : any;
  timeLeft : any;
  imagesSentForConfirmation = false;
  autoAccept = false;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  checkStatus  : string;
  uploadFiles = new FormData();
  loading = false;
  startTimer  : any;
  timerFlag = true;
  filesLength = () => {
    return this.keepFiles.Files.length;
  }
  private killTrigger = new Subject();
  private fetchData$ : Observable<any>;
  private refreshInterval$: Observable<string>;
  constructor(
    private aroute: ActivatedRoute,
    private api: ApiService,
    private keepFiles : KeepFilesService,
    private toastr : ToastrService,
  ) { }

  ngOnInit() {
    this.orderId = this.aroute.snapshot.paramMap.get('id');
    this.orderDetailsAPI();
  }
  orderDetailsAPI() {
    this.orderDetails$ = {
      next: data => {
        this.orderDetails = data;
        this.imageConfirmationId = data["confirmation"];
        if(!this.autoAccept) this.getConfirmationImagesStatus();
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Fetched Order data", this.orderDetails)
      }
    }
    this.api.getOrderDetails(this.orderId).subscribe(this.orderDetails$);
  }
  getOrderStatus(id: number): any {
    let status;
    this.orderStatusFilter.forEach((kvp) => {
      if (id == kvp.key) status = kvp.value;
    });
    return status;
  }
  uploadOrderImages(){
  this.uploadImagesObs$ = {
    next : data =>
    {
      this.toastr.success("Images Sent To User Successfully.");
      this.getConfirmationImagesStatus();
      this.getElapsedTime();
    },
    error : err => this.toastr.error("Something Went Wrong. Try Later!"),
    complete : () => {
      this.loading = false;
    }
  }
  for(let i=0;i<this.keepFiles.Files.length;i++){
    this.uploadFiles.append(`image${i+1}`,this.keepFiles.Files[i]);
  }
  this.uploadFiles.append("status","Sent");
  this.api.sendImagesToSeller(this.uploadFiles,this.imageConfirmationId).subscribe(this.uploadImagesObs$);
  }
  getConfirmationImagesStatus(){
    this.api.getConfirmationImages(this.orderId).subscribe(
      (data) =>
      {
        this.imagesSent = data;
        if(this.imagesSent[0].status == "Sent")
        this.getElapsedTime();
        if(this.imagesSent[0].status == "Partial")
        this.getElapsedTimeforCall();
         if(this.imagesSent[0].status == "Confirmed")
         {
           this.orderDetailsAPI();
            this.autoAccept = true;
         }
      },
      (error) => this.toastr.error("Something Went Wrong. Try Again Later!"),
      () => console.log("getting status")
    )
  }
  getElapsedTime(){
    this.api.getElapsedTimeForImages(this.imageConfirmationId).subscribe(
      (data) => {
        if(data["elapsed"] == 121)
        {
        this.toastr.info("Time To Accept Images Has Expired. The Order Was Accepted Automatically.");
        this.getConfirmationImagesStatus();
        }
        else
        {
        this.timeLeft = 120 - data["elapsed"];
        this.startTimer =
        setInterval(()=>{
          if(this.timeLeft > 0)
          {
          this.timeLeft--;
          }
          else
          {
          this.toastr.info("Time To Accept Images Has Expired. The Order Was Accepted Automatically");
          this.clearTimer();
          this.getConfirmationImagesStatus();
          this.killTrigger.next();
          }
        }
        ,1000)
        this.checkStatusOfImages();
        }
      },
      (error) => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
  }
    getElapsedTimeforCall(){
    this.api.getElapsedTimeForCall(this.imageConfirmationId).subscribe(
      (data) => {
        if(data["elapsed"] == 181)
        {
        this.toastr.info("Time To Accept Images Has Expired. The Order Has been Rejected.");
        this.getConfirmationImagesStatus();
        }
        else
        {
        this.timeLeft = 180 - data["elapsed"];
        this.startTimer =
        setInterval(()=>{
          if(this.timeLeft > 0)
          {
          this.timeLeft--;
          }
          else
          {
          this.toastr.info("Time To Accept Images Has Expired. The Order Has been Rejected.");
          this.clearTimer();
          this.getConfirmationImagesStatus();
          this.killTrigger.next();
          }
        }
        ,1000)
        this.checkStatusOfImages();
        }
      },
      (error) => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
  }
  checkStatusOfImages(){
    this.fetchData$ = this.api.getImageConfirmationStatus(this.imageConfirmationId);
    this.refreshInterval$ = timer(5000, 10000)
    .pipe(
      takeUntil(this.killTrigger),
      switchMap(() => this.fetchData$),
      catchError(error => of('Error'))
    );
    this.refreshInterval$.subscribe(
      (data)=> {
        this.checkStatus = data;
        if(this.checkStatus == 'Confirmed' || this.checkStatus == 'Rejected'){
          this.clearTimer();
          this.orderDetailsAPI();
          this.timerFlag = true;
          this.killTrigger.next();
        }
        else
        if(this.checkStatus == 'Partial' && this.timerFlag){
          this.clearTimer();
          this.killTrigger.next();
          this.getElapsedTimeforCall();
          this.timerFlag = false;
        }
        },
        err => of('Error')
    )
  }
  clearTimer(){
    clearInterval(this.startTimer);
  }
  ngOnDestroy(){
    this.killTrigger.next();
  }
}
