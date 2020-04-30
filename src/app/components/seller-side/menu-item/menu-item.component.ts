import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, Form} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';
import { FileUploadComponent } from '../../user-side/file-upload/file-upload.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false},
  }]
})
export class MenuItemComponent implements OnInit {
  ItemDetailsFormGroup : FormGroup;
  ItemPropertiesFormGroup : FormGroup;
  ItemPriceTimeFormGroup : FormGroup;
  characters_used : number = 0;
  characters_left: number = 60;
  itemIsVeg : boolean = true;
  ItemObjtoPush = new FormData();
  itemIsAvailable = true;
  addNewSellerItemObs$ :Observer<any>;
  imageUploaded : boolean = false;
  smallScreen : any;
  categories = [
    {name:'Indian'},
    {name:'Western'},
    {name:'Asian'},
    {name:'Mediterranian'},
  ]
  prepTimeList = [
    {value:'30 minutes'},
    {value:'60 minutes'},
    {value:'90 minutes'},
    {value: '120 minutes'},
  ]
  constructor(private _formBuilder: FormBuilder,
    private api: ApiService,
    private keepFile : KeepFilesService,
    private cd : ChangeDetectorRef,
    private toastr : ToastrService,
    private router : Router,
    private breakpointObserver : BreakpointObserver) {
      breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ]).subscribe(result => {
        this.smallScreen = result.matches;
    });
    }

  ngOnInit() {
    this.ItemDetailsFormGroup = this._formBuilder.group({
      title : ['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/i)
      ]],
      short_description :['',[
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(60)
      ]],
    });
    this.ItemPropertiesFormGroup = this._formBuilder.group({
      category : ['',[
        Validators.required
      ]],
      is_veg:[''],
      is_available:['']
    });
    this.ItemPriceTimeFormGroup = this._formBuilder.group({
      price:['',[
        Validators.required,
        Validators.pattern(/^[0-9.]+$/)
      ]],
      time_to_prepare:['',[
        Validators.required
      ]]
    });
  }
  addToFormObject(data,boolprop ?: boolean,imageUpload ?: boolean){
    if(boolprop)
    {
      data["is_veg"] = this.itemIsVeg;
      data["is_available"] = this.itemIsAvailable;
    }
    for(const key in data){
      this.ItemObjtoPush.append(key,data[key]);
    }
  }
  imageHasBeenUploaded(event){
    this.imageUploaded = event;
  }
  apiToAddNewSellerItem(){
    this.ItemObjtoPush.append("image",this.keepFile.Files[0]);
    this.addNewSellerItemObs$ = {
      next : data => {
        this.toastr.success("Sucessfully Added A New Item! Redirecting....");
        this.router.navigateByUrl(`/seller-side/(sellerRouterOutlet:seller-items)/`);
      },
      error : err => this.toastr.error("Something Went Wrong. Try Again Later!"),
      complete : () => console.log()
    }
    this.api.addNewItemFromSellerDashboard(this.ItemObjtoPush).subscribe(this.addNewSellerItemObs$);
    this.ItemPriceTimeFormGroup.reset();
  }
  getVegNonVegValue(){
    this.itemIsVeg = !this.itemIsVeg;
  }
  getAvailabilityValue(){
    this.itemIsAvailable = !this.itemIsAvailable;
  }
  get title() { return this.ItemDetailsFormGroup.get("title");}
  get short_description() { return this.ItemDetailsFormGroup.get("short_description");}
  get category(){ return this.ItemPropertiesFormGroup.get("category");}
  get is_veg(){ return this.ItemPropertiesFormGroup.get("this.is_veg");}
  get price(){ return this.ItemPriceTimeFormGroup.get("price");}
  get time_to_prepare(){ return this.ItemPriceTimeFormGroup.get("time_to_prepare");}
  get is_available(){ return this.ItemPropertiesFormGroup.get("is_available");}
}
