import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductDataService } from '../../../services/product-data.service'
import { Product } from '../../../models/product.model'


@Component({
  selector: 'app-ready-to-wear',
  templateUrl: './ready-to-wear.page.html',
  styleUrls: ['./ready-to-wear.page.scss'],
})
export class ReadyToWearPage implements OnInit {

  products: Product[]

  productDataService: ProductDataService

  constructor(private router: Router, productDataService: ProductDataService)
  { 
    this.productDataService = productDataService
    this.products = this.getProducts()
  }

  ngOnInit() {
  }

  getProducts(): Product[]
  {
    return this.productDataService.getProducts("ready-to-wear")
  }

  formatPrice(price: number): string
  {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
    return formatter.format(price);
  }
  
}