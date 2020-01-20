import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-inc-dec-cart',
  templateUrl: './inc-dec-cart.component.html',
  styleUrls: ['./inc-dec-cart.component.css'],
})
export class IncDecCartComponent implements OnInit{
  @Input() productId : Number;
  constructor(
    private cart : CartService
    ) { }

  ngOnInit() {
  }
  getItemQuantity(id :number){
    let quantity ;
    this.cart.items.find(item => {
      if(id === item.meal_id) quantity =  item.quantity;
    });
    return quantity;
  }



}
