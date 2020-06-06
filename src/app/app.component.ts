import { Component, OnDestroy, HostListener } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  showBackToTopBtnVar = false;
  @HostListener('window:scroll',[])
  showBackToTopBtn(){
    let scrollVal = window.pageYOffset || document.documentElement.scrollTop;
    this.showBackToTopBtnVar = scrollVal > 100 ? true : false;
  }
  moveToTop(){
    document.documentElement.scrollTop = 0;
  }
  constructor(public loader : LoaderService){
  }
}
