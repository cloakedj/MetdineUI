import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private product : ProductService) { }

  ngOnInit() {
  }

}
