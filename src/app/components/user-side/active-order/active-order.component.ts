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
  hideMessage : false;
  imageStatusObs$ : Observer<any>;
  statusCompleted = false;
  constructor(private api : ApiService,
    private gc : GetCategoryService) { }

  ngOnInit() {
    this.activeOrderData$ = {
      next : (data) => {
        this.activeOrderData = data;
        this.api.getConfirmationImages(this.activeOrderData[0].id).subscribe(this.sentImagesObs$);
      },
      error: (err) => console.log(err),
      complete : () => console.log("Request Completed")
    }
    this.sentImagesObs$ = {
      next : (data) => this.sentImages = data,
      error : (err) => console.log(err),
      complete : () => console.log("Request comleted")
    }
    this.api.getActiveOrderDetailsForBuyer().subscribe(this.activeOrderData$);
  }
  getStatus(id : any){
    let val;
    this.orderStatusFilter.forEach((arr,k,v)=>{
      if(id == arr.key) val = arr.value;
    });
    return val;
  }
  acceptImages(id : any){
    this.statusimagesObs$ = {
      next : (data) => console.log(data),
      error : (err) => console.log(err),
      complete : () => {
        this.statusCompleted = true
        this.api.getConfirmationImages(this.activeOrderData[0].id).subscribe(this.sentImagesObs$);
      }
    }
    this.api.acceptSellerImages(id).subscribe(this.statusimagesObs$);  
  }
  rejectImages(id : any){
    this.api.rejectSellerImages(id).subscribe(this.statusimagesObs$); 
    this.api.getConfirmationImages(this.activeOrderData[0].id).subscribe(this.sentImagesObs$);
     
  }

}
