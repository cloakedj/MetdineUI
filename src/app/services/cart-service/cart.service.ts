import { Injectable } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../product-service/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
	items: Item[] = [];
  total: number = 0;
  cartLength: number = 0;
  constructor(
    private productService: ProductService,
  ){ }

loadCart(): void {
  this.total = 0;
  this.items = [];
  let cart = JSON.parse(localStorage.getItem('cart'));
  for (var i = 0; i < cart.length; i++) {
    let item = JSON.parse(cart[i]);
    this.items.push({
      product: item.product,
      quantity: item.quantity
    });
    this.cartLength=0;
    this.items.map(item => this.cartLength+=item.quantity);
    this.total += item.product.price * item.quantity;

  }
}

remove(id: string): void {
  let cart: any = JSON.parse(localStorage.getItem('cart'));
  let index: number = -1;
  for (var i = 0; i < cart.length; i++) {
    let item: Item = JSON.parse(cart[i]);
    if (item.product.id == id) {
      if(item.quantity === 1)
      cart.splice(i, 1);
      else
      {
        item.quantity -= 1;
        cart[i] = JSON.stringify(item);
      }
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  this.loadCart();
}
getCartLength(): Number{
  if(this.items.length === 0)
  this.cartLength=0;
  return this.cartLength;
}
updateCart(id: string): void{
  if (id) {
    var item: Item = {
    product: this.productService.findOne(id),
    quantity: 1
    };
    if (localStorage.getItem('cart') == null) {
    let cart: any = [];
    cart.push(JSON.stringify(item));
    localStorage.setItem('cart', JSON.stringify(cart));
    } else {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
      index = i;
      break;
      }
    }
    if (index == -1) {
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let item: Item = JSON.parse(cart[index]);
      item.quantity += 1;
      cart[index] = JSON.stringify(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    }
    this.loadCart();
  } else {
    this.loadCart();
  }
}
  clearCart(): void{
   localStorage.setItem("cart",JSON.stringify(""));
   this.cartLength = 0;
   this.items = [];
   this.total = 0;
  }
}
