import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { ApiService } from '../api-service/api.service';
import { Subscription, Observer } from 'rxjs';
import { CartItem } from 'src/app/entities/cart-item.entity';


@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy, OnInit{
  items: CartItem[] = [];
  total: number = 0;
  existingOrder : CartItem[];
  orderDetailsId : Number;
  orderId : Number;
  userCartdetaisl$ : Observer<any>;
  itemExistsQuantity : number;
  cartSize = this.items.length === 0 ? 0 : this.items.length; 
  constructor(private productService: ProductService,
    private api: ApiService,
  ){ 
  }

  ngOnInit(){
    this.loadCart();
  }

loadCart(): void {
  this.total = 0;
  this.items = [];
  this.userCartdetaisl$ = {
    next : (data) => {
      this.items = data.items;
      this.total = data.total;
      this.orderId = data.id;
    },
    error : (err) => console.log(err),
    complete : () => console.log("Request to cart fetch completed")
  }
  this.api.getUserCartDetails().subscribe(this.userCartdetaisl$);
  
}
                    
getCartLength(): number{
  console.log(this.items.length)
 return this.cartSize;
}
updateCart(id: Number,operation?: string): void{
  console.log(this.items);  
    if(this.items === undefined)
    {

    this.api.additemtoCart(id,this.productService.sellerId)
    .subscribe(
      data => 
      {
        console.log(data);
        console.log("New item Added To cart")
      },
      err => console.log(err),
      () => 
      {
        this.loadCart();
        console.log("Request to add order Completed");
      }
    )
    }
    else
    {
      let existsInCart : boolean = this.items.find(item => item.meal_id === id) ? true : false;
      let orderItemId;
    if(existsInCart)
    {
      this.items.find(item => {
        if(item.meal_id === id)
        {
        this.itemExistsQuantity = item.quantity;
        orderItemId = item.id;
        }
      });
      console.log(orderItemId);
      this.updateCartItem(operation,orderItemId);
    }
    else
    {
    this.api.additemtoCart(id,this.productService.sellerId)
    .subscribe(
      data => console.log("New item Added To cart"),
      err => console.log(err),
      () => {
        this.loadCart();
        console.log("Request to add order Completed");
      }
    )
  }

}
}
  clearCart(){
    this.api.deleteCurrentCart().subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {
        this.loadCart();
        console.log("Completed request to delete current cart");
      }
    )
  }
  updateCartItem(operation?: string, id?: Number)
  {
    if(operation === 'a') this.itemExistsQuantity += 1;
    else if(this.itemExistsQuantity - 1 === 0)  this.deleteItemFromCart(id); 
    else  this.itemExistsQuantity -=1;
    this.api.updateOrderItemQuantity(id,this.itemExistsQuantity)
    .subscribe(
      (data) => console.log("Cart item Quantity updated"),
      (err) => console.log(err),
      () => 
      {
        this.loadCart();
        console.log("request to update quantity completed")
      }
    );
  }
  deleteItemFromCart(id : Number){
    if(this.getCartLength() - 1 === 0 && this.itemExistsQuantity - 1 === 0 )
    this.clearCart();
    else
    {
    this.api.deleteOrderItemById(id)
    .subscribe(
      elem => console.log("Deleted Item from Cart"),
      err => console.log(err),
      () => 
      {
        this.loadCart();
        console.log("request to delete Item Completed Successfully");
      }
    )
    }
  }
  ngOnDestroy(){
  }
}
