import { CartService } from './../../services/cart-service/cart.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addOrAddedToCart'
})
export class AddOrAddedToCartPipe implements PipeTransform {
  constructor(
    private cart : CartService
  ){}
  status : boolean = true;
  transform(value: any, seller ?: any, update ?: number): any {
    if(parseInt(localStorage.getItem("seller__id")) == seller){
      this.cart.items.forEach(item =>{
        if(item.meal_id == value)
        this.status = false;
      });
      return this.status;
    }
    return true;
  }

}
