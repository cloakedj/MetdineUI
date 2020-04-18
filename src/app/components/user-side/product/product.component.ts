import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ɵConsole, AfterViewInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { CartComponent } from '../cart/cart.component';
import { IncDecCartComponent } from '../inc-dec-cart/inc-dec-cart.component';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { GetCategoryService } from 'src/app/services/get-category/get-category.service';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search-filter/search.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [CartComponent,IncDecCartComponent],
})
export class ProductComponent implements OnInit{
  sellerId : Number;
  products : any;
  quantZero : boolean;
  @Input() searchBar : any;
  cartHasDiffSeller : boolean = false;
  update : number;
  constructor(
  public productService: ProductService,
  private incdeccart: IncDecCartComponent,
  public cart: CartService,
  private api : ApiService,
  private gc : GetCategoryService,
  private _search : SearchService,
  private aroute : ActivatedRoute
  )
  {
    this.products = this.productService.productsArr;
    this.aroute.params.subscribe(params => {
      this.sellerId = params["id"];
    });
  }

  ngOnInit() {
  }
  updateCart(id :any){
    this.cart.updateCart(id);
  }
  searchitems(){
    this.searchBar.valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    .switchMap((query) => {
      if(query == '')
      {
      this.searchBar.reset();
      }
      return this._search.searchDish(query)
    })
    .subscribe((results : any) => {
      if(results.status === 400) return;
      else{
        if(results.length == 0)
        this.products = results;
      }
    });
  }
  cartUpdation(id){
    if(localStorage.getItem("seller__id") && localStorage.getItem("seller__id") !== "undefined"){
      if(this.sellerId == parseInt(localStorage.getItem("seller__id")))
      {
        this.cart.updateCart(id);
        this.update = Math.random() * 1000;
      }
      else
      this.cartHasDiffSeller= true;
    }
    else
    {
    localStorage.setItem("seller__id",this.sellerId.toString());
    this.cart.updateCart(id);
    this.update = Math.random() * 1000;
    }
    }

}
