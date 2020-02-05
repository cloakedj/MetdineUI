import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-inc-dec-cart',
  templateUrl: './inc-dec-cart.component.html',
  styleUrls: ['./inc-dec-cart.component.css'],
})
export class IncDecCartComponent implements OnInit{
  @Input() productId : number;
  @Input() toggle : boolean;
  @Output() switch : EventEmitter<boolean> = new EventEmitter();
  cartSize  = this.cart.getCartLength();
  cartAction = (pid : number,action ?: string) =>{
    this.cart.updateCart(pid,action);
    if(this.cartSize)
    {
      console.log("false");
    this.switch.emit(false);
    }
    else
    this.switch.emit(true);
  }
  constructor(
    private cart : CartService
    ) { 
    }

  ngOnInit() {
  }
  getItemQuantity(id :Number){
    let quantity ;
    this.cart.items.find(item => {
      if(id === item.meal_id) quantity =  item.quantity;
    });
    return quantity;
  }



}
