import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ProductCategoryDataService } from '../../../services/product-category-data.service'
import { ProductDataService } from '../../../services/product-data.service'

import { ProductCategory } from '../../../models/product-category.model'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit
{
  productModel = ''
  productName = ''
  productImageURL = ''
  productDescription = ''
  productPrice = ''

  imageUploaded: boolean

  selectedCategory: ProductCategory
  productCategories: ProductCategory[]

  productCategoryDataService: ProductCategoryDataService
  productDataService: ProductDataService

  //products: Product[]
  //productDataService: ProductDataService
  //cartDataService: CartDataService

  constructor(private router: Router, private alertController: AlertController, productCategoryDataService: ProductCategoryDataService, productDataService: ProductDataService)
  { 
    this.productCategoryDataService = productCategoryDataService
    this.productDataService = productDataService
    
  }

  ngOnInit() {
    this.imageUploaded = false
    this.productCategories = this.getProductCategories()
  }

  getProductCategories(): ProductCategory[]
  {
    return this.productCategoryDataService.getAllProductCategories()
  }

  async uploadImage()
  {
    const alert = await this.alertController.create({
      header: 'Upload Image',
      message: 'Please input the URL of the image file',
      inputs: [
        {
          name: 'imageURL',
          type: 'url',
          placeholder: 'Image URL'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel')
          }
        },
        {
          text: 'Upload',
          handler: async data => {  
            this.productImageURL = data.imageURL
            this.imageUploaded = true
          }
        }
      ]
    });
    alert.present();
  }

  async addProduct()
  {
    console.log(this.selectedCategory)
    if (typeof this.selectedCategory === "undefined")
    {
      const validFieldsAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please select the product category.',
        buttons: ['OK']
        })

      return await validFieldsAlert.present()
    }

    if (this.productModel === '' ||
        this.productName === '' ||
        this.productImageURL === '' ||
        this.productDescription === '' ||
        this.productPrice === '')
    {
      const validFieldsAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please fill in all fields.',
        buttons: ['OK']
        })

      return await validFieldsAlert.present()
    }

    this.productDataService.addProduct(this.selectedCategory.path, this.productModel, this.productName, this.productImageURL, this.productDescription, Number(this.productPrice))
      .then
      (
        async res => 
        {
          const alert = await this.alertController.create({
            header: 'Product added sucessfully!',
            buttons: [{
              text: 'OK',
              handler: () => {
                let path = 'home/product-categories/' + this.selectedCategory.path
                this.router.navigateByUrl(path)
              }
            }]
          })

          await alert.present()
        },

        async err => 
        {
          const alert = await this.alertController.create({
            header: 'Product added failed!',
            message: err.message,
            buttons: ['Try again']
          })

          await alert.present()
        }
      )
  }

  async notifyImageLoadedFail()
  {
    this.imageUploaded = false
    this.productImageURL = ''
    
    const alert = await this.alertController.create({
      header: 'Image Loaded Failed',
      message: 'This image URL is invalid',
      buttons: ['OK']
    });

    return await alert.present();
  }

}
