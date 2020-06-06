import { Injectable, OnDestroy, OnInit, Input } from '@angular/core';
import { ProductService } from '../product-service/product.service';
import { ApiService } from '../api-service/api.service';
import { Subscription, Observer } from 'rxjs';
import { CartItem } from 'src/app/entities/cart-item.entity';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy, OnInit{
  @Input()items: CartItem[] = [];
  @Input() delivery_charge: any;
  @Input() total: number = 0;
  existingOrder : CartItem[];
  orderDetailsId : number;
  completed = false;
  @Input() orderId : number;
  userCartdetails$ : Observer<any>;
  itemExistsQuantity : number;
  constructor(private productService: ProductService,
    private api: ApiService,
    private toastr : ToastrService
  ){
  }

  ngOnInit(){
    this.loadCart();
  }

loadCart(): void {
  this.userCartdetails$ = {
    next : (data) => {
      this.items = data.items;
      this.total = data.total;
      this.orderId = data.id;
      this.delivery_charge = data.delivery_charge;
      if(data.items.length)
      {
      if(!localStorage.getItem("seller__id"))
      localStorage.setItem("seller__id",`${data.seller_id}`);
      }
    },
    error : (err) => this.toastr.error(err),
    complete : () => this.completed = true,
  }
  this.api.getUserCartDetails().subscribe(this.userCartdetails$);

}

getCartLength(){
 return this.items.length;
}
updateCart(id: number,operation?: string): void{
    if(this.items === undefined)
    {
    this.api.additemtoCart(id,parseInt(localStorage.getItem("seller__id")))
    .subscribe(
      data => data,
      err => this.toastr.error(err),
      () =>
      {
        this.loadCart();
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
      this.updateCartItem(operation,orderItemId);
    }
    else
    {
    this.api.additemtoCart(id,this.productService.sellerId)
    .subscribe(
      data => data,
      err => this.toastr.error(err),
      () => {
        this.loadCart();
      }
    )
  }

}
}
  clearCart(clearToAddNewSeller ?: any, id ?: any){
    this.api.deleteCurrentCart().subscribe(
      data => {
        if(clearToAddNewSeller) this.updateCart(clearToAddNewSeller);
        localStorage.removeItem("cartSize");
      },
      err => this.toastr.error(err),
      () => {
        if(!clearToAddNewSeller)
        localStorage.removeItem("seller__id");
        else
        localStorage.setItem("seller__id",id.toString());
        this.loadCart();
      }
    )
  }
  updateCartItem(operation?: string, id?: number)
  {
    if(operation === 'a') this.itemExistsQuantity += 1;
    else if(this.itemExistsQuantity - 1 === 0)  this.deleteItemFromCart(id);
    else  this.itemExistsQuantity -=1;
    this.api.updateOrderItemQuantity(id,this.itemExistsQuantity)
    .subscribe(
      (data) => data,
      (err) => this.toastr.error(err),
      () =>
      {
        this.loadCart();
      }
    );
  }
  deleteItemFromCart(id : number){
    if(this.getCartLength() - 1 === 0 && this.itemExistsQuantity - 1 === 0 )
    {
    this.clearCart();
    }
    else
    {
    this.api.deleteOrderItemById(id)
    .subscribe(
      elem => elem,
      err => this.toastr.error(err),
      () =>
      {
        this.loadCart();
      }
    )
    }
  }
  ngOnDestroy(){
  }
}
