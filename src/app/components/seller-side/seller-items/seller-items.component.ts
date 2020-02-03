import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Observer } from 'rxjs';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { SellerDashboardService } from 'src/app/services/seller-dashboard-service/seller-dashboard.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-items',
  templateUrl: './seller-items.component.html',
  styleUrls: ['./seller-items.component.css']
})
export class SellerItemsComponent implements OnInit {
  @Input() skipItem : any;
  title = "Menu Items";
  itemsObs$ : Observer<any[]>;
  menuItems : any[];
  constructor(private api : ApiService,
    private router : Router,
    private gc : GetCategoryService,
    private seller : SellerDashboardService) { 
    this.itemsObs$ ={
      next : data => this.menuItems = data,
      error : err => console.log(err),
      complete : () => console.log("Fetched Seller meals for dashboard")
    }
    this.api.requestSellerDetails(localStorage.getItem("seller__id")).subscribe(this.itemsObs$);
    }

  ngOnInit() {
    if(this.skipItem) this.title = "Other Menu Items";

  }
  vegNonvegFilter(type : boolean):string{
    if (type) return "Veg";
    return "Non Veg";
  }
  getCategory(id: any){
    return id !== 'No meals yet' ? this.gc.returnCategory(id-1) : 'No meals yet';
  }
  getTime(id : any){
    return this.gc.returnTime(id-1);
  }
  editItem(id){
    this.router.navigate(['/seller-side',{outlets : {'sellerRouterOutlet' :['edit-item',id]}}])

  }
  addNewItemRouteActivate(){
    this.router.navigate(['/seller-side',{outlets : {'sellerRouterOutlet' :'addItem'}}])
  }

}
