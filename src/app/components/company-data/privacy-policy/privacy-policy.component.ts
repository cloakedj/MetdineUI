import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() noShow = false;
  constructor() { }

  ngOnInit() {
  }

}
