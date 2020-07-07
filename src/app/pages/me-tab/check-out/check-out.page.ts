import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CartDataService } from '../../../services/cart-data.service'
import { ProductDataService } from '../../../services/product-data.service'

import { Item } from '../../../models/item.model'
import { Cart } from '../../../models/cart.model'


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {

  // input fields
  shippingPhoneNum: number

  // variables
  cartItems: Item[]
  cart: Cart
  subtotal: number
  shippingFee: number = 0
  tax: number = 10
  total: number

  
  shippingOptions = [
    { val: 'FREE', price: 0, time: '5-7 business days', checked: true },
    { val: '$7.00', price: 7, time: '3-5 business days', checked: false },
    { val: '$17.00', price: 17, time: '2-3 business days', checked: false },
    { val: '$22.00', price: 22, time: '1 business day', checked: false },
  ]


  // services
  productDataService: ProductDataService
  cartDataService: CartDataService

  constructor(private activatedRoute: ActivatedRoute, private router: Router, productDataService: ProductDataService, cartDataService: CartDataService)
  { 
    this.productDataService = productDataService
    this.cartDataService = cartDataService   
  }

  ngOnInit() 
  {
    this.cart = this.cartDataService.getCart()
    this.cartItems = this.cart.items
    this.subtotal = this.cart.totalPrice
    
    this.shippingFee = this.shippingOptions[0].price
    this.total = this.subtotal + this.shippingFee + this.subtotal*this.tax/100
  }

  shippingOptionIsChecked(checkedOption)
  { 
    // if user unchecked an option
    if(checkedOption.checked === true)
    { 
      this.shippingOptions[0].checked = true
      this.shippingFee = this.shippingOptions[0].price
    }
    else
    {
      for(let option of this.shippingOptions)
      {
        if(option !== checkedOption)
        {
          option.checked = false
        } 
      }
      this.shippingFee = checkedOption.price
    }

    this.total = this.subtotal + this.shippingFee + this.subtotal*this.tax/100
  }

  print()
  {
    for(let option of this.shippingOptions)
    {
      console.log(option.val, option.checked)
    }
  }

  getTotalPrice(): number
  {
    return this.cartDataService.getTotalPrice()
  }

}
