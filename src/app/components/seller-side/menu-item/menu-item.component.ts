import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

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
  characters_used : number = 0;
  characters_left: number = 60;
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
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ItemDetailsFormGroup = this._formBuilder.group({
      Item_Name : ['',[
        Validators.required,
        Validators.pattern(/[A-Za-z]/gi)
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
  }
  get Item_Name() { return this.ItemDetailsFormGroup.get("Item_Name");}
  get Item_Image() { return this.ItemDetailsFormGroup.get("Item_Image");}
  get Item_Desc() { return this.ItemDetailsFormGroup.get("Item_Desc");}
}
