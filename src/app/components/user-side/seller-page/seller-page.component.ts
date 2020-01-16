import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit {
  constructor(
    private product : ProductService,
    private aroute : ActivatedRoute,
    private router: Router,
  ) { 
    this.product.sellerId = this.aroute.snapshot.paramMap.get('id');
    this.product.sellers$.subscribe(
      (data) =>{
        data.map((elem)=>
        {
        if(elem.id == this.product.sellerId)
        this.product.sellerLogo = elem.logo;
      })
      },
      (err) => console.log(err),
      () => console.log("Completed")    
    )
  }

  ngOnInit() {
    this.product.getSellerItems(this.product.sellerId);
  }
}
