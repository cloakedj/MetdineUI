import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent implements OnInit {
  @Input() noShow = false;
  constructor() { }

  ngOnInit() {
  }

}
