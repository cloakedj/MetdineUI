import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';
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
  ];
  imageUpdated = false;
  constructor(private aroute :ActivatedRoute,
    private api : ApiService,
    private gc : GetCategoryService,
    private _fb : FormBuilder,
    private keepFiles : KeepFilesService) {
      this.aroute.params.subscribe(routeParams => {
        this.productId = routeParams.id;
        this.api.getMealItemDetail(this.productId).subscribe(this.product$);
      });
     }

  ngOnInit() {
    this.product$ = {
      next : data => this.productDetails = data,
      error : err => console.log(err),
      complete : () => console.log("Got product Details")
    }
    this.api.getMealItemDetail(this.productId).subscribe(this.product$);
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
  getCategory(id : any){
    return this.gc.returnCategory(id-1);
  }
  getTime(id : any){
    return this.gc.returnTime(id-1);
  }
  vegNonvegFilter(type : boolean):string{
    if (type) return "Veg";
    return "Non Veg";
  }
  getVegNonVegValue(){
    this.itemIsVeg = !this.itemIsVeg;
  }
  imageChanged(){
    this.imageUpdated = true;
    this.updatedFormData.append("image",this.keepFiles.Files[0])
  }
  updateItem(){
    this.updateItemData['_forEachChild']((control,name)=>{
      if(control.dirty){
        this.updatedFormData.append(name.toString(),control.value);
      }
    });
    this.patchObs$ = {
      next : data => console.log("Patched"),
      error: err => console.log(err),
      complete : () => console.log("Patch Completed")
    }
    this.api.patchMealDataById(this.productId,this.updatedFormData).subscribe(this.patchObs$);
  }

}
