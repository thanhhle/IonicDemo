import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductDataService } from '../../../services/product-data.service'
import { Product } from '../../../models/product.model'

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
})
export class AccessoriesPage implements OnInit {

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
    return this.productDataService.getProducts("accessories")
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
