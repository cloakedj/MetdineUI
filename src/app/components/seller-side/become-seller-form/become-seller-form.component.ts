import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { FileUploadDirective } from 'src/app/Directives/file-upload.directive';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

@Component({
  selector: 'app-become-seller-form',
  templateUrl: './become-seller-form.component.html',
  styleUrls: ['./become-seller-form.component.css'],
  providers: [FileUploadDirective]
})
export class BecomeSellerFormComponent implements OnInit {
  becomeSellerData : Seller;
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
    private uploadfile : FileUploadDirective,
    private files : KeepFilesService) {
  }
  onSubmit(data){
    data.logo = this.files.File;
    this.api.sellerRegistration(data).subscribe();
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
