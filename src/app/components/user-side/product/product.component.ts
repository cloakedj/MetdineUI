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
  cartHItems: boolean = false;
  products : any;
  @Input() searchBar : any;
  constructor(
  public productService: ProductService,
  private incdeccart: IncDecCartComponent,
  public cart: CartService,
  private api : ApiService,
  private gc : GetCategoryService,
  private _search : SearchService
  ) 
  { 
    this.products = this.productService.productsArr;
  }

  ngOnInit() {
  }
  vegNonvegFilter(type : boolean):string{
    if (type) return "Veg";
    return "Non Veg";
  }
  getCategory(id: any){
    return id !== 'No meals yet' ? this.gc.returnCategory(id) : 'No meals yet';
  }
  cartHasItems(){
    this.cartHItems = true;
  }
  onSwitch(event){
    this.cartHItems = event;
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

}
