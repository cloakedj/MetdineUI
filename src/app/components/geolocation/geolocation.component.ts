import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone, ViewEncapsulation  } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import PlaceResult = google.maps.places.PlaceResult;
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';

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
  public appearance = Appearance;
  public selectedAddress: PlaceResult;

  constructor(
    private mapsAPILoader : MapsAPILoader,
    private ngZone : NgZone
  ) { }
  ngOnInit(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      // let autocomplete = new google.maps.places.Autocomplete(, {
      //   types: ["address"]
      // });
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }
 
      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }
  
 onGermanAddressMapped($event: GermanAddress) {
  console.log('onGermanAddressMapped', $event);
}
  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

}
