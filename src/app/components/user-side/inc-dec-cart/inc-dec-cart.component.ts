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
  checkUpdate : number = 0;
  cartSize  = this.cart.getCartLength();
  cartAction = (pid : number,action ?: string) =>{
    this.cart.updateCart(pid,action);
  }
  constructor(
    public cart : CartService
    ) {
    }


  ngOnInit() {
  }



}
