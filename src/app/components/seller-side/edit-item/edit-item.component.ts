import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  productId : any;
  productDetails : any;
  product$ : Observer<any>;
  patchObs$ : Observer<any>;
  updateItemData : FormGroup;
  updatedFormData = new FormData();
  editDetails = false;
  itemIsVeg : boolean;
  completed = false;
  imageUpdated = false;
  patchItemObs$ : Observer<any> = {
    next : data => this.toastr.success("Item Status Changed Successfully"),
    error : err => this.toastr.error("Something Went Wrong. Try Again Later!"),
    complete : () => this.getProductDetails()
  }
  categories = [
    {name:'Indian',time:'30 minutes'},
    {name:'Western',time:'60 minutes'},
    {name:'Asian',time:'90 minutes'},
    {name:'Mediterranian',time:'120 minutes'},
  ];
  prepTimeList = [
    { key: 1, value: 'Cooking' },
    { key: 2, value: 'Ready' },
    { key: 3, value: 'On The Way' },
    { key: 4, value: 'Completed' },
    {key : 6, value : 'Rejected'}
  ];
  constructor(private aroute :ActivatedRoute,
    private api : ApiService,
    private _fb : FormBuilder,
    private keepFiles : KeepFilesService,
    private router : Router,
    private toastr : ToastrService) {
      this.aroute.params.subscribe(routeParams => {
        this.productId = routeParams.id;
        this.api.getMealItemDetail(this.productId).subscribe(this.product$);
      });
     }
     getProductDetails(){
      this.product$ = {
        next : data => this.productDetails = data,
        error : err => this.toastr.error(err),
        complete : () => this.completed = true,
      }
      this.api.getMealItemDetail(this.productId).subscribe(this.product$);
     }
  ngOnInit() {
    this.getProductDetails();
    this.updateItemData = this._fb.group({
      title : ['',[
        Validators.pattern(/^[a-zA-Z\s]+$/i)
      ]],
      short_description :['',[
        Validators.minLength(30),
        Validators.maxLength(60)
      ]],
      category : [''],
      is_veg:[''],
      price:[''],
      time_to_prepare:['']
    });
  }
  getVegNonVegValue(){
    this.itemIsVeg = !this.itemIsVeg;
  }
  imageChanged(){
    this.imageUpdated = true;
  }
  updateItem(){
    if(this.imageUpdated)
    this.updatedFormData.append("image",this.keepFiles.Files[0]);
    this.updateItemData['_forEachChild']((control,name)=>{
      if(control.dirty){
        this.updatedFormData.append(name.toString(),control.value);
      }
    });
    this.patchObs$ = {
      next : data => this.toastr.success("Item Updated Successfully"),
      error : err => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => this.getProductDetails()
    }
    this.api.patchMealDataById(this.productId,this.updatedFormData).subscribe(this.patchObs$);
  }
  removeMenuItem(){
    this.api.deleteMenuItemById(this.productId).subscribe(
      data => {
        this.toastr.success("Menu Item Deleted Successfully!");
        this.router.navigateByUrl(`/seller-side/(sellerRouterOutlet:seller-items)`)
      },
      err => this.toastr.error("Something Went Wrong. Try Again Later!")
    )
  }
  makeItemUnavailable(id : any){
    this.api.patchMealAvailabilityById(id,false).subscribe(this.patchItemObs$);
  }
  makeItemAvailable(id : any){
    this.api.patchMealAvailabilityById(id,true).subscribe(this.patchItemObs$);
  }

}
