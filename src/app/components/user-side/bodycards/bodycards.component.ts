import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Seller } from '../../../entities/seller.entity';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bodycards',
  templateUrl: './bodycards.component.html',
  styleUrls: ['./bodycards.component.css']
})
export class BodycardsComponent implements OnInit {
  public sellers : any;
  public sellers$ : any;
  public sellersArr : any;
  isSeller  = localStorage.getItem("is_seller") ? localStorage.getItem("is_seller") : false;
  constructor(private api:ApiService,
    public product : ProductService,
    private gc : GetCategoryService,
    private router : Router,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    if(localStorage.getItem("Auth_Token"))
    {
    this.sellers$ = this.api.getAllSellers();
    this.api.getAllSellers().subscribe(
      data => this.sellersArr = data,
      err => this.toastr.error("Something Went Wrong. Try Again Later!"),
    )
    }
  }
  openMap(){
    this.router.navigateByUrl('/map');
  }
  becomeASeller(){
    this.router.navigate(['/becomeSeller']);
  }
}
