import { Component, OnInit } from '@angular/core';
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
  orderId: string;
  orderDetails$: Observer<any>;
  orderDetails: any;
  uploadImagesObs$ : Observer<any>;
  imagesSent : any;
  orderStatusFilter = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' }
  ];
  uploadFiles = new FormData();
  loading = false;
  constructor(
    private aroute: ActivatedRoute,
    private api: ApiService,
    private keepFiles : KeepFilesService,
  ) { }

  ngOnInit() {
    this.orderId = this.aroute.snapshot.paramMap.get('id');
    this.orderDetailsAPI();
    this.getConfirmationImagesStatus(this.orderId);
  }
  orderDetailsAPI() {
    this.orderDetails$ = {
      next: data => this.orderDetails = data,
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
    next : data => console.log("uploaded"),
    error : err => console.log(err),
    complete : () => this.loading = false
  }
  for(let i=0;i<this.keepFiles.Files.length;i++){
    this.uploadFiles.append(`image${i+1}`,this.keepFiles.Files[i]);
  }
  this.api.sendImagesToSeller(this.uploadFiles,this.orderId).subscribe(this.uploadImagesObs$);
  }
  getConfirmationImagesStatus(id : any){
    this.api.getConfirmationImages(id).subscribe(
      (data) => this.imagesSent = data,
      (err) => console.log(err),
      () => console.log("getting status")
    )
  }

}
