import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product-service/product.service';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  constructor(
  private productService: ProductService,
  private cart: CartService,
  ) 
  { }

  ngOnInit() {
    this.products = this.productService.findAll();
  }

}
