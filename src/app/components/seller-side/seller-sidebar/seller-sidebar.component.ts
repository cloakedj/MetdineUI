import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.css']
})
export class SellerSidebarComponent implements OnInit {
  sellerData$ : Observer<any>;
  sellerData : any[];
  constructor(private api : ApiService) { }

  ngOnInit() {
    this.sellerData$ = {
      next: (data) => {
        this.sellerData = data;
      },
      error: (err) => console.log(err),
      complete: () => console.log("Request completed")
    };
    this.api.getSellerQuickData().subscribe(this.sellerData$);
  }

}
