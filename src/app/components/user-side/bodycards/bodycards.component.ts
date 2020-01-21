import { Component, OnInit } from '@angular/core';
import { Seller } from '../../../entities/seller.entity';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-bodycards',
  templateUrl: './bodycards.component.html',
  styleUrls: ['./bodycards.component.css']
})
export class BodycardsComponent implements OnInit {
  constructor(private api:ApiService,
    private product : ProductService,
    ) { }

  ngOnInit() {
    this.product.getSellersDetails();
  }
  getAllSellers() : Observable<any>{
    return this.product.sellers$;
  }

}
