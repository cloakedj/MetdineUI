import { Component, OnInit, ChangeDetectorRef, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Seller } from 'src/app/entities/seller.entity';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import PlaceResult = google.maps.places.PlaceResult;
import { ToastrService } from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-become-seller-form',
  templateUrl: './become-seller-form.component.html',
  styleUrls: ['./become-seller-form.component.css'],
})
export class BecomeSellerFormComponent implements OnInit {
  becomeSellerData : Seller;
  showPrivacyPolicyModal: boolean = false;
  showTermsOfUseModal: boolean = false;
  checkedPolicyBox = false;
  Obs$ : Observer<any>;
  File : File;
  latitude : any;
  longitude : any;
  sellerRegister = new FormData();
  private geoCoder;
  formatted_address : any;
  @(ViewChild)('search',{static:true}) autocompletesearch : ElementRef;
  becomeSellerForm: FormGroup = this.formBuilder.group({
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    description:['',[
      Validators.required,
      Validators.minLength(60),
      Validators.maxLength(150)
    ]
    ],
    logo:[''],
    // phone:['',[
    //   Validators.pattern(/^[0-9]+$/),
    //   Validators.minLength(10),
    //   Validators.maxLength(10),
    //   Validators.required
    // ]],
    address:['',Validators.required],
  });
  showImageError : boolean;
  constructor(private formBuilder: FormBuilder,
    private api : ApiService,
    private cd : ChangeDetectorRef,
    private files : KeepFilesService,
    private router : Router,
    private maps : MapsAPILoader,
    private ngZone : NgZone,
    private toastr : ToastrService) {
      this.maps.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;

        const autocomplete = new google.maps.places.Autocomplete(this.autocompletesearch.nativeElement, {
          types: [],
          componentRestrictions : { 'country' : 'IN'}
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.getAddress(this.latitude,this.longitude);
          });
        });
      });
  }
  onSubmit(data){
    if(this.files.Files.length == 0)
    {
      this.showImageError = true;
    }
    else{
    data.logo = this.files.Files[0];
    data.address = this.formatted_address;
    data["latitude"] = this.latitude;
    data["longitude"] = this.longitude;
    for(let k in data){
      this.sellerRegister.append(k,data[k]);
    }
    this.Obs$ = {
      next : data => {
        this.api.SetSellerAccountStatus()
        this.becomeSellerForm.reset();
      }
        ,
      error : err => this.toastr.error(err),
      complete : () => {
        localStorage.setItem("is_seller","true");
        this.router.navigateByUrl('/seller-side/(sellerRouterOutlet:seller-dashboard)')
      }
    }
    this.api.sellerRegistration(this.sellerRegister).subscribe(this.Obs$);
  }
  }
  ngOnInit() {
    if(localStorage.getItem("is_seller") == "true")
    this.router.navigateByUrl('/seller-side/(sellerRouterOutlet:seller-dashboard)')
  }
  getAddress(latitude, longitude) {
    this.formatted_address = undefined;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.formatted_address = results[0].formatted_address;
        } else {
         this.toastr.error("No results Found!");
        }
      } else {
        this.toastr.error("Unable to fetch location try later!");
      }

    });
  }
    switchCheckBox(){
    this.checkedPolicyBox = !this.checkedPolicyBox;
  }
  hideModal(){
    this.showPrivacyPolicyModal === true ? this.showPrivacyPolicyModal = false 
    : this.showTermsOfUseModal = false;
  }

  get first_name(){ return this.becomeSellerForm.get('first_name');}
  get last_name(){ return this.becomeSellerForm.get('last_name');}
  get logo(){ return this.becomeSellerForm.get("logo");}
  get description(){ return this.becomeSellerForm.get("description")}
  // get phone(){ return this.becomeSellerForm.get("phone");}
  get address(){ return this.becomeSellerForm.get("address");}

}
