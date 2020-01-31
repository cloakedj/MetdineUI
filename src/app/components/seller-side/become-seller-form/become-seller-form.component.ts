import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-become-seller-form',
  templateUrl: './become-seller-form.component.html',
  styleUrls: ['./become-seller-form.component.css'],
})
export class BecomeSellerFormComponent implements OnInit {
  becomeSellerData : Seller;
  Obs$ : Observer<any>;
  File : File;
  becomeSellerForm: FormGroup = this.formBuilder.group({
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    desc:['',[
      Validators.maxLength(200)
    ]
    ],
    logo:[''],
    phone:['',[
      Validators.pattern(/^[0-9]+$/),
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.required
    ]],
    address:['',Validators.required],
  });
  constructor(private formBuilder: FormBuilder,
    private api : ApiService,
    private cd : ChangeDetectorRef,
    private files : KeepFilesService,
    private router : Router) {
  }
  onSubmit(data){
    data.logo = this.files.File;
    this.Obs$ = {
      next : data => console.log("Sent"),
      error : err => console.log(err),
      complete : () => this.router.navigateByUrl("/seller-side/(sellerRouterOutlet:seller-dashboard)")
    }
    this.api.sellerRegistration(data).subscribe(this.Obs$);
    this.becomeSellerForm.reset();
  }
  ngOnInit() {
  }
  

  get first_name(){ return this.becomeSellerForm.get('first_name');}
  get last_name(){ return this.becomeSellerForm.get('last_name');}
  get logo(){ return this.becomeSellerForm.get("logo");}
  get desc(){ return this.becomeSellerForm.get("desc")}
  get phone(){ return this.becomeSellerForm.get("phone");}
  get address(){ return this.becomeSellerForm.get("address");}

}
