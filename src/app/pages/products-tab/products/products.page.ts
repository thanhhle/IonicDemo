import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CartDataService } from '../../../services/cart-data.service'

import { ProductDataService } from '../../../services/product-data.service'
import { Product } from '../../../models/product.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  
  productCategory: string
  displayMode: number

  products: Product[]
  productDataService: ProductDataService
  cartDataService: CartDataService

  constructor(private activatedRoute: ActivatedRoute, private router: Router, productDataService: ProductDataService, cartDataService: CartDataService)
  { 
    this.productDataService = productDataService
    this.cartDataService = cartDataService
  }

  ngOnInit()
  {
    this.displayMode = 0
    this.productCategory = this.activatedRoute.snapshot.paramMap.get('id')
    this.products = this.getProducts()
  }

  getProducts(): Product[]
  {
    return this.productDataService.getProducts(this.productCategory)
  }

  addToCart(product: Product)
  {
    this.cartDataService.addProduct(product)
  }

  getCartItemCount()
  {
    return this.cartDataService.getItemCount()
  }

  viewAsGrid()
  {
    this.displayMode = 1
  }

  viewAsList()
  {
    this.displayMode = 2
  }
  
  viewInFull()
  {
    this.displayMode = 0
  }

  navigateToMyCartPage()
  {
    this.router.navigateByUrl('home/menu/my-cart')
  }
  
}