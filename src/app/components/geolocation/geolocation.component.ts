import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone, ViewEncapsulation  } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import PlaceResult = google.maps.places.PlaceResult;
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';

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
  constructor(
    private mapsAPILoader : MapsAPILoader,
    private ngZone : NgZone,
    private aroute : ActivatedRoute,
    private api : ApiService
  ) { 
   this.aroute.queryParams.subscribe(params =>{
    this.isOnCheckoutMode = params['checkout'];
    });
  }
  ngOnInit(){
    this.GetLocation();
    this.locationBtnTitle = this.isOnCheckoutMode ? "Use This Address And Checkout"
    : "Save New Address";
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
          console.log(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
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
        console.log(position);
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
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
  onAddressBtnClick(){
    if(this.isOnCheckoutMode){
      let redirecturl;
      this.api.checkoutUserCart(this.address)
      .subscribe(
        data => redirecturl = data["redirect_url"],
        err => console.log(err),
        () =>{
          location.href = redirecturl
          console.log("Completed Checkout");
        } 
      )
    }
  }

}
