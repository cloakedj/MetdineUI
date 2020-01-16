import { Component, OnInit, ɵConsole } from '@angular/core';
import { Product } from '../../../entities/product.entity';
import { ProductService } from '../../../services/product-service/product.service';
import { CartComponent } from '../cart/cart.component';
import { IncDecCartComponent } from '../inc-dec-cart/inc-dec-cart.component';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { SellerItem } from 'src/app/entities/seller-item.entity';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [CartComponent,IncDecCartComponent],
})
export class ProductComponent implements OnInit {
  constructor(
  private productService: ProductService,
  private incdeccart: IncDecCartComponent,
  private cart: CartService,
  private api : ApiService,
  ) 
  { }

  ngOnInit() {
  }
  vegNonvegFilter(type : boolean):string{
    if (type) return "Veg";
    return "Non Veg";
  }

}
