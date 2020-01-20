import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-become-seller-form',
  templateUrl: './become-seller-form.component.html',
  styleUrls: ['./become-seller-form.component.css']
})
export class BecomeSellerFormComponent implements OnInit {

  becomeSellerForm: FormGroup = this.formBuilder.group({
    fname:['',Validators.required],
    lname:['',Validators.required],
    distance: [''],
    desc:['',[
      Validators.maxLength(200)
    ]
    ],
    logo:[''],
    phoneNumber:['',[
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.required
    ]],
    address:['',Validators.required],
    latitude:[''],
    longitude:['']
  });
  constructor(private formBuilder: FormBuilder,
    private api : ApiService) {
  }
  onSubmit(data){
    this.api.buyerRegistration(data).subscribe();
    this.becomeSellerForm.reset();
  }
  ngOnInit() {
  }
  get fname(){ return this.becomeSellerForm.get('fname');}
  get lname(){ return this.becomeSellerForm.get('lname');}
  get distance(){ return this.becomeSellerForm.get('distance');}
  get logo(){ return this.becomeSellerForm.get("logo");}
  get desc(){ return this.becomeSellerForm.get("desc")}
  get phoneNumber(){ return this.becomeSellerForm.get("phoneNumber");}
  get address(){ return this.becomeSellerForm.get("address");}
  get latitude(){ return this.becomeSellerForm.get('latitude');}
  get longitude(){ return this.becomeSellerForm.get('longitude');}

}
