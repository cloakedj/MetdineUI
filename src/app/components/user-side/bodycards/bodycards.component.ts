import { Component, OnInit } from '@angular/core';
import { Seller } from '../../../entities/seller.entity';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
@Component({
  selector: 'app-bodycards',
  templateUrl: './bodycards.component.html',
  styleUrls: ['./bodycards.component.css']
})
export class BodycardsComponent implements OnInit {
  sellers$: Observable<Seller[]>;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getSellerDetails();
  }
  getSellerDetails():void{
    this.sellers$ = this.api.getAllSellers();
  }

}
