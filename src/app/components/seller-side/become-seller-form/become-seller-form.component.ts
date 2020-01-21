import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';

@Component({
  selector: 'app-become-seller-form',
  templateUrl: './become-seller-form.component.html',
  styleUrls: ['./become-seller-form.component.css']
})
export class BecomeSellerFormComponent implements OnInit {
  becomeSellerData : Seller;
  becomeSellerForm: FormGroup = this.formBuilder.group({
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    desc:['',[
      Validators.maxLength(200)
    ]
    ],
    logo:[null],
    phone:['',[
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.required
    ]],
    address:['',Validators.required],
  });
  constructor(private formBuilder: FormBuilder,
    private api : ApiService,
    private cd : ChangeDetectorRef) {
  }
  onSubmit(data){
    this.api.sellerRegistration(data).subscribe();
    this.becomeSellerForm.reset();
  }
  ngOnInit() {
  }
  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.becomeSellerForm.patchValue({
          logo: reader.result
       });
        this.cd.markForCheck();
      };
    }
  }

  get first_name(){ return this.becomeSellerForm.get('first_name');}
  get last_name(){ return this.becomeSellerForm.get('last_name');}
  get logo(){ return this.becomeSellerForm.get("logo");}
  get desc(){ return this.becomeSellerForm.get("desc")}
  get phone(){ return this.becomeSellerForm.get("phone");}
  get address(){ return this.becomeSellerForm.get("address");}

}
