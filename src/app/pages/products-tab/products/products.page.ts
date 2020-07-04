import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CartDataService } from '../../../services/cart-data.service'
import { UserDataService } from '../../../services/user-data.service'
import { ProductDataService } from '../../../services/product-data.service'
import { AuthService } from '../../../services/auth.service'

import { Product } from '../../../models/product.model'
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {

  currentUser: User
  productCategory: string
  displayMode: number

  products: Product[]
  productDataService: ProductDataService
  cartDataService: CartDataService
  authService: AuthService
  userDataService: UserDataService

  constructor(private activatedRoute: ActivatedRoute, private router: Router, productDataService: ProductDataService, cartDataService: CartDataService, authService: AuthService, userDataService: UserDataService)
  { 
    this.productDataService = productDataService
    this.cartDataService = cartDataService
    this.authService = authService
    this.userDataService = userDataService
  }

  ngOnInit()
  {
    this.displayMode = 1
    this.productCategory = this.activatedRoute.snapshot.paramMap.get('id')
    this.products = this.getProducts() 
    this.currentUser = this.getCurrentUser()
  }

  getProducts(): Product[]
  {
    return this.productDataService.getProducts(this.productCategory)
  }

  getCurrentUser(): User
  {
    let user: User = new User("", "", "", "")
    this.userDataService.getUser(this.authService.getCurrentUserID())
      .then(res => 
        {
          user.uid = res.data().uid
          user.email = res.data().email
          user.lastName = res.data().lastName
          user.firstName = res.data().firstName
          user.role = res.data().role
          user.createdDate = res.data().createdDate
          user.lastActiveDate = res.data().lastActiveDate
          user.lastSignInDate = res.data().lastSignInDate
          user.beautyTipIDs = res.data().beautyTipIDs
        })

    return user
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

  navigateToAddProductPage()
  {
    this.router.navigateByUrl('home/add-product')
  }

  
}