import { CartService } from './../../services/cart-service/cart.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getquantity',
  pure : false
})
export class GetquantityPipe implements PipeTransform {
  constructor(private cart : CartService){}
  transform(value: any): any {
    return this.getItemQuantity(value);
  }
  getItemQuantity(id :Number){
    let quantity ;
    let found = false;
    this.cart.items.find(item => {
      if(id === item.meal_id){
        quantity =  item.quantity;
        found = true;
      }
    });
    if(!found)
    quantity = 0;
    return quantity;
  }

}
