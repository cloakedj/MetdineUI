import { Component, OnInit } from '@angular/core';
import { Seller } from '../../../entities/seller.entity';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';

@Component({
  selector: 'app-bodycards',
  templateUrl: './bodycards.component.html',
  styleUrls: ['./bodycards.component.css']
})
export class BodycardsComponent implements OnInit {
  constructor(private api:ApiService,
    private product : ProductService,
    private gc : GetCategoryService
    ) { }

  ngOnInit() {
    this.product.getSellersDetails();
  }
  getAllSellers() : Observable<any>{
    return this.product.sellers$;
  }
  getCategory(id: any){
    return id !== 'No meals yet' ? this.gc.returnCategory(id) : 'No meals yet';
  }
}
