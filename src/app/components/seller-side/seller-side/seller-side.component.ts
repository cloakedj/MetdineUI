import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-seller-side',
  templateUrl: './seller-side.component.html',
  styleUrls: ['./seller-side.component.css']
})
export class SellerSideComponent implements OnInit {
  toggleMenu = false;
  winwidth = window.screen.width;
  deviceActive = (window.screen.width) <= 800 || this.toggleMenu ? 'smaller' : 'computer';
  constructor() {
  }

  ngOnInit() {
  }
  toggleMenuBtn(){
    let elt = document.getElementById('toggleDisplay');
    if(this.toggleMenu) elt.style.display = 'none';
    else elt.style.display = 'block';
    this.toggleMenu = !this.toggleMenu;
  }
  hideSidebar(evt){
    let elt = document.getElementById('toggleDisplay');
    if(this.toggleMenu) elt.style.display = 'none';
    if(window.screen.width < 800)
    this.toggleMenu = !this.toggleMenu;
  }
}
