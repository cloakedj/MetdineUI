import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, Form} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { ApiService } from 'src/app/services/api-service/api.service';

/**
 * @title Stepper label bottom position
 */
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class MenuItemComponent implements OnInit {
  ItemDetailsFormGroup : FormGroup;
  ItemPropertiesFormGroup : FormGroup;
  ItemPriceTimeFormGroup : FormGroup;
  characters_used : number = 0;
  characters_left: number = 60;
  newSellerItemObject : SellerItem;
  itemIsVeg : boolean = true;
  ItemObjtoPush = [];
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
    private cd : ChangeDetectorRef) {}

  ngOnInit() {
    this.ItemDetailsFormGroup = this._formBuilder.group({
      Item_Name : ['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/i)
      ]],
      Item_Image : ['',[
        Validators.required
      ]],
      Item_Desc :['',[
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(60)
      ]],
    });
    this.ItemPropertiesFormGroup = this._formBuilder.group({
      Item_Category : ['',[
        Validators.required
      ]],
      Item_VegorNonveg:[''],
    });
    this.ItemPriceTimeFormGroup = this._formBuilder.group({
      Item_Price:['',[
        Validators.required,
        Validators.pattern(/^[0-9.]+$/)
      ]],
      Item_Preparation_Time:['',[
        Validators.required
      ]]
    })
  }
  addToFormObject(data){
    this.ItemObjtoPush.push(data);
    console.log(this.ItemObjtoPush);
  }
  onLogoUpload(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ItemDetailsFormGroup.patchValue({
          Item_Image: reader.result
       });
        this.cd.markForCheck();
      };
    }
  }
  getVegNonVegValue(){
    this.itemIsVeg = !this.itemIsVeg;
    console.log(this.itemIsVeg);
  }
  get Item_Name() { return this.ItemDetailsFormGroup.get("Item_Name");}
  get Item_Image() { return this.ItemDetailsFormGroup.get("Item_Image");}
  get Item_Desc() { return this.ItemDetailsFormGroup.get("Item_Desc");}
  get Item_Category(){ return this.ItemPropertiesFormGroup.get("Item_Category");}
  get Item_VegorNonveg(){ return this.ItemPropertiesFormGroup.get("this.Item_VegorNonveg");}
  get Item_Price(){ return this.ItemPriceTimeFormGroup.get("Item_Price");}
  get Item_Preparation_Time(){ return this.ItemPriceTimeFormGroup.get("Item_Preparation_Time");}
}
