import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = [
      { id: 'pid1', name: 'Product 1', price: 100, photo: 'englishbreakfast.jpeg',tags: ['breakfast','english'] },
      { id: 'pid2', name: 'Product 2', price: 200, photo: 'golgappa.jpg', tags: ['snack','spicy'] },
      { id: 'pid3', name: 'Product 3', price: 300, photo: 'southindianthali.jpeg', tags: ['southindianfood'] }
    ];
   }
   findAll(): Product[]{
    return this.products;
  }
  findOne(id: string): Product{
    return this.products[this.getSelectedItem(id)];
  }
  private getSelectedItem(id: string){
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === id){
        return i;
      }
    }
    return -1;
  }
}
