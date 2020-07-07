import { Component, OnInit } from '@angular/core';

import { CartDataService } from '../../../services/cart-data.service'
import { Cart } from '../../../models/cart.model'
import { Product } from '../../../models/product.model'
import { Item } from '../../../models/item.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  cartDataService: CartDataService
  cart: Cart
  cartItems: Item[]

  constructor(private router: Router, cartDataService: CartDataService)
  { 
    this.cartDataService = cartDataService
    this.cart = this.cartDataService.getCart()
    this.cartItems = this.cart.items
  }

  ngOnInit() {
  }

  increaseCartItem(item: Item)
  {
    this.cartDataService.addProduct(item.product)
  }

  decreaseCartItem(item: Item)
  {
    this.cartDataService.decreaseProduct(item.product)
  }

  removeCartItem(item: Item)
  {
    this.cartDataService.removeProduct(item.product)
  }

  getItemCount(): number
  {
    return this.cartDataService.getItemCount()
  }

  getTotalPrice(): number
  {
    return this.cartDataService.getTotalPrice()
  }

  navigateToCheckOutPage()
  {
    if(this.getItemCount() > 0)
    {
      this.router.navigate(['home/menu/my-cart/check-out'])
    }
  }

}
