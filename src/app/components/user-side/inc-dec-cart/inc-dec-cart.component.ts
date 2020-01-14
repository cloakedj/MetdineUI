import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Item } from '../../../entities/item.entity';
import { CartComponent } from '../cart/cart.component';
import { ProductService } from '../../../services/product-service/product.service';

@Component({
  selector: 'app-inc-dec-cart',
  templateUrl: './inc-dec-cart.component.html',
  styleUrls: ['./inc-dec-cart.component.css'],
})
export class IncDecCartComponent implements OnInit{
  @Input() productId : string;
  items: Item[] = [];
  constructor(
    private cartComp: CartComponent,
    private prodService: ProductService
    ) { }

  ngOnInit() {
  }

  getId(prodId? : string): number{
    if(prodId)
      this.productId = prodId;
    for(let item of this.cartComp.cart.items){
    if(item.product.id == this.productId)
      return item.quantity;
  }
}
onProdZero(prodId? : string): boolean{
  if(this.getId(prodId) == 0 || this.getId(prodId) == undefined)
    return true;
  return false;

}



}
