import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductCategoryDataService } from '../../../services/product-category-data.service'
import { CartDataService } from '../../../services/cart-data.service'

import { ProductCategory } from '../../../models/product-category.model'

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit 
{
  selectedIndex = 0
  productCategories: ProductCategory[]

  productCategoryDataService: ProductCategoryDataService
  cartDataService: CartDataService
  
  constructor(private router: Router, productCategoryDataService: ProductCategoryDataService, cartDataService: CartDataService)
  { 
    this.productCategoryDataService = productCategoryDataService
    this.cartDataService = cartDataService
    this.productCategories = this.getProductCategories()
  }

  ngOnInit() {
    const path = window.location.pathname.split('home/product-categories/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.productCategories.findIndex(page => page.path.toLowerCase() === path.toLowerCase());
    }
  }

  getProductCategories(): ProductCategory[]
  {
    return this.productCategoryDataService.getAllProductCategories()
  }

  getCartItemCount(): number
  {
    return this.cartDataService.getItemCount()
  }

  navigateToMyCartPage()
  {
    this.router.navigateByUrl('home/menu/my-cart')
  }
}

