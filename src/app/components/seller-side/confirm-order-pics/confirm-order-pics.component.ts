import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

@Component({
  selector: 'app-confirm-order-pics',
  templateUrl: './confirm-order-pics.component.html',
  styleUrls: ['./confirm-order-pics.component.css']
})
export class ConfirmOrderPicsComponent implements OnInit {
  orderId: any;
  orderDetails$: Observer<any>;
  @Input() orderDetails: any;
  uploadImagesObs$ : Observer<any>;
  imagesSent : any;
  imageConfirmationId : any;
  timeLeft = 120;
  imagesSentForConfirmation = false;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  uploadFiles = new FormData();
  loading = false;
  filesLength = this.keepFiles.Files.length;
  constructor(
    private aroute: ActivatedRoute,
    private api: ApiService,
    private keepFiles : KeepFilesService,
    private toastr : ToastrService,
  ) { }

  ngOnInit() {
    this.orderId = this.aroute.snapshot.paramMap.get('id');
    this.orderDetailsAPI();
    this.getConfirmationImagesStatus();
  }
  orderDetailsAPI() {
    this.orderDetails$ = {
      next: data => {
        this.orderDetails = data;
        this.imageConfirmationId = data["confirmation"];
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
    next : data => this.toastr.success("Images Sent To User Successfully."),
    error : err => this.toastr.error("Something Went Wrong. try Again Later!"),
    complete : () => {
      this.loading = false;
      this.imagesSentForConfirmation = true;
      this.startTimer();
      this.getConfirmationImagesStatus();
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
      },
      (err) => this.toastr.error("Something Went Wrong. Try Again Later!"),
      () => console.log("getting status")
    )
  }
  startTimer(){
      setInterval(()=>{
        if(this.timeLeft > 0)
        this.timeLeft--;
        else
        clearInterval();
      }
      ,1000)
    }
}
