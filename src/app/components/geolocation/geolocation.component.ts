import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 12.9344;
  lng = 77.6060;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    
   }
   marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.mapInitializer();
  }

}
