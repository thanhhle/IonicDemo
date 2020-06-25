import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { AuthService } from './auth.service'
import { UserDataService } from './user-data.service'
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  cart: Cart = new Cart()
  
  constructor() { }

  getCart(): Cart
  {
    return this.cart
  }

  getItemCount(): number
  {
    return this.cart.itemCount
  }

  getTotalPrice(): number
  {
    let totalPrice = 0
    for(let item of this.cart.items)
    {
      totalPrice += item.price
    }
    return totalPrice
  }
  
  addProduct(product: Product)
  {
    let productExisted = false

    for(let item of this.cart.items)
    {
      if(item.product.model === product.model)
      {
        item.quantity += 1
        item.price += item.product.price
        productExisted = true
        break
      }
    }

    if(!productExisted)
    {
      this.cart.items.push(new Item(product, 1, product.price))
    }

    this.cart.itemCount += 1
    this.cart.totalPrice += product.price
  }

  decreaseProduct(product: Product)
  {
    for(let [index, item] of this.cart.items.entries())
    {
      if(item.product.model === product.model)
      {
        item.quantity -= 1
        item.price -= item.product.price
        if (item.quantity == 0)
        {
          this.cart.items.splice(index, 1)
        }
      }
    }
    this.cart.itemCount -= 1
    this.cart.totalPrice -= product.price
  }

  removeProduct(product: Product)
  {
    for(let [index, item] of this.cart.items.entries())
    {
      if(item.product.model === product.model)
      {
        this.cart.itemCount -= this.cart.items[index].quantity
        this.cart.totalPrice -= this.cart.items[index].price
        this.cart.items.splice(index, 1)
      }
    }
  }
}
