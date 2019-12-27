import { Component, OnInit, AfterViewInit } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-trending-sellers',
  templateUrl: './trending-sellers.component.html',
  styleUrls: ['./trending-sellers.component.css']
})
export class TrendingSellersComponent implements OnInit,AfterViewInit {
  seller_imgs: Array<{src: string}> = [];
  constructor() { 
    this.seller_imgs = [
      {src : "https://media-cdn.tripadvisor.com/media/photo-s/03/f8/10/1b/chefs-restaurants.jpg"},
      {src : "https://www.dellaadventure.com/images/restaurant-cafe-24-thumb.jpg"},
      {src : "https://www.fabhotels.com/blog/wp-content/uploads/2018/09/Rooftop-Breeze.jpg"},
      {src : "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/05/Checking-out-some-of-Indias-most-incredible-restaurants-Image-2.jpg"},
    ]
  }

  ngOnInit() {
  }
  ngAfterViewInit()
  {
    const glide = new Glide('.glide',{
      type:'slider',
      startAt : 0,
      perView : 3,
      gap: 50,
      bound: true,
    });
    glide.mount();
  }

}
