import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone, ViewEncapsulation, Input  } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import PlaceResult = google.maps.places.PlaceResult;
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GeolocationComponent implements OnInit{
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  public selectedAddress: PlaceResult;
  @(ViewChild)('search',{static:true}) autocompletesearch : ElementRef;
  public searchControl : FormControl = new FormControl();
  public isOnCheckoutMode;
  public locationBtnTitle;
  saveNewAddress$ : Observer<any>;
  public locationIcon = {
    url : 'https://image.flaticon.com/icons/png/512/1176/1176403.png',
    label: {
      color : 'black',
      text : 'You'
    },
    labelOrigin:{
      x: 20,
      y: -10
    },
    scaledSize:{
      height : 40,
      width: 40
    }
  };
  labelProps = {
    color : 'black',
    text : 'You',
    fontWeight : 'bolder',
    fontSize : '16px',
    fontFamily: 'Righteous, cursive',
  }
  zipCode : any;
  isSigningUp : boolean;
  savedAddressesObs$ : Observer<any>;
  savedAddresses : any;
  newAddressForm : FormGroup;
  loading = false;
  @Input() isSellerSide : boolean;
  constructor(
    private mapsAPILoader : MapsAPILoader,
    private ngZone : NgZone,
    private aroute : ActivatedRoute,
    private api : ApiService,
    private _fb : FormBuilder,
    private router : Router,
    private toastr : ToastrService
  ) {
   this.aroute.queryParams.subscribe(params =>{
    this.isOnCheckoutMode = params['checkout'];
    this.isSigningUp = params['signup'];
    });
    if(!this.isSigningUp)
    {
    this.savedAddressesObs$ = {
      next: (data) => this.savedAddresses = data,
      error: (err) => console.log(err),
      complete: () => console.log("Completed request")
    }
    this.api.getBuyerAddress().subscribe(this.savedAddressesObs$);
  }
  }
  ngOnInit(){
    this.GetLocation();
    this.locationBtnTitle = this.isOnCheckoutMode ? "Use This Address And Checkout"
    : "Save New Address";
    this.newAddressForm = this._fb.group({
      street_address : ['',[Validators.required]],
      apartment_address : ['',[Validators.required]],
      name : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      zip : [],
      latitude: [],
      longitude: []
    });
  }
  GetLocation(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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
          this.zipCode = place.address_components[place.address_components.length - 1].long_name;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
          this.getAddress(this.latitude,this.longitude)
          this.searchControl.reset();
        });
      });
    });
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 18;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getLocationCurrent(){
    this.setCurrentLocation();
  }
  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.address = results[0].formatted_address;
          this.zipCode = results[0].address_components[results[0].address_components.length - 1].long_name;
        } else {
          this.toastr.error('No results found');
        }
      } else {
        this.toastr.error('Geocoder failed due to: ' + status);
      }

    });
  }
  onAddressBtnClick(){
    this.loading = true;
    if(this.isOnCheckoutMode){
      let redirecturl;
      this.api.checkoutUserCart(this.address)
      .subscribe(
        data => redirecturl = data["redirect_url"],
        err => console.log(err),
        () =>{
          this.loading = false;
          location.href = redirecturl
          console.log("Completed Checkout");
        }
      )
    }
    else if(this.isSellerSide){
      this.api.saveSellerAddress(this.latitude,this.longitude,this.address).subscribe(this.saveNewAddress$);
    }
    else
    {
      this.newAddressForm.patchValue({
        zip : this.zipCode,
        latitude : this.latitude,
        longitude : this.longitude
      })
      this.saveNewAddress$ = {
        next : (data) => console.log("Saved Address"),
        error : err => console.log(err),
        complete : () => {
          this.router.navigateByUrl('/user/(userRouterOutlet:home)');
        }
      }
      this.api.saveBuyerAddress(this.newAddressForm.value).subscribe(this.saveNewAddress$);
    }
  }

}
