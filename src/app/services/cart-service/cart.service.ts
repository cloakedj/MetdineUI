import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../product-service/product.service';
import { ApiService } from '../api-service/api.service';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/entities/cart-item.entity';


@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy, OnInit{
  items: Item[] = [];
  total: number = 0;
  cartLength: number = 0;
  cartUpdateApiSubscription : Subscription;
  existingOrder : CartItem[];
  orderDetailsId : Number;
  orderId : Number;
  constructor(private productService: ProductService,
    private api: ApiService,
  ){ 
  }

  ngOnInit(){
    this.api.fetchCartDetails()
    .subscribe(
      (elem) => {
        if(elem.ordered === true)
        {
        this.orderId = elem.id;
        this.existingOrder = elem.items;
        console.log(this.existingOrder);
        }
      },
      (err) => console.log(err),
      () => console.log("Completed request")
    )
  }

loadCart(): void {
  this.total = 0;
  this.items = [];
  if(localStorage.getItem("cart") === null)
  {
    localStorage.setItem("cart",JSON.stringify(this.existingOrder))
  }
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

remove(id: Number): void {
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
  localStorage.setItem('cart', JSON.stringify(cart));
  this.loadCart();
}
getCartLength(): Number{
  if(this.items.length === 0)
  this.cartLength=0;
  return this.cartLength;
}
updateCart(id: Number): void{
  if (id) {
    let item: Item = {
    product: this.productService.getSelectedItem(id),
    quantity: 1
    };
    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "[]")
    {
    let cart: any = [];
    cart.push(JSON.stringify(item));
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartUpdateApiSubscription = this.cartUpdateApi(item.product.id , 
      this.productService.sellerId , item.quantity);
      this.cartUpdateApiSubscription.unsubscribe();
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
      this.cartUpdateApiSubscription =  
      this.cartUpdateApi(item.product.id , this.productService.sellerId , item.quantity) 
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let item: Item = JSON.parse(cart[index]);
      item.quantity += 1;
      cart[index] = JSON.stringify(item);
      this.cartUpdateApiSubscription = 
      this.cartUpdateApi(item.product.id , this.productService.sellerId , item.quantity);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    }
    this.loadCart();
  } else {
    this.loadCart();
  }
}
  clearCart(): void{
   localStorage.removeItem('cart');
   this.cartLength = 0;
   this.items = [];
   this.total = 0;
  }
  cartUpdateApi(pid: Number, sid : Number, q : number): Subscription{
  return this.api.addNewOrder(pid, sid, q)
  .subscribe(
    (elem) => this.orderDetailsId = elem["id"],
    (err) => console.log(err),
    () => console.log("Completed")
  )
  }
  ngOnDestroy(){
    localStorage.removeItem("cart");
  }
}
