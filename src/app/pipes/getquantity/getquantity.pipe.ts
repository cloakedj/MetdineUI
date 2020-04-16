import { CartService } from './../../services/cart-service/cart.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getquantity',
  pure : false
})
export class GetquantityPipe implements PipeTransform {
  constructor(private cart : CartService){}
  transform(value: any, update : number): any {
    return this.getItemQuantity(value);
  }
  getItemQuantity(id :Number){
    let quantity ;
    this.cart.items.find(item => {
      if(id === item.meal_id) quantity =  item.quantity;
    });
    return quantity;
  }

}
