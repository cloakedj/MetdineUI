import {Component, OnInit} from '@angular/core';
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
export class MenuItemComponent implements OnInit  {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
