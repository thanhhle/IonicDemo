import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductCategoryDataService } from '../../../services/product-category-data.service'
import { ProductCategory } from '../../../models/product-category.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  
  selectedIndex = 0
  productCategories: ProductCategory[]

  productCategoryDataService: ProductCategoryDataService
  
  constructor(private router: Router, productCategoryDataService: ProductCategoryDataService)
  { 
    this.productCategoryDataService = productCategoryDataService
    this.productCategories = this.getProductCategories()
  }

  ngOnInit() {
  }

  getProductCategories(): ProductCategory[]
  {
    return this.productCategoryDataService.getAllProductCategories()
  }

}
