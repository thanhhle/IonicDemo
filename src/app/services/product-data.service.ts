import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService
{
  productConverter = 
  {
    toFirestore(product: Product): firebase.firestore.DocumentData
    {
      const productDocumentData: firebase.firestore.DocumentData =
      {
        model: product.model,
        name: product.name,
        imageURL: product.imageURL,
        description: product.description,
        price: product.price
      }
      return productDocumentData
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Product
    {
      const data = snapshot.data(options)!
      return new Product(data.model, data.name, data.imageURL, data.description, data.price)
    }
  }

  constructor() { }

  addProduct(category: string, model: string, name: string, imageURL: string, description: string, price: number)
  {
    return new Promise<any>((resolve, reject) => 
    {
      const product = new Product(model, name, imageURL, description, price)
      console.log(product)
      
      firebase.firestore().collection('productCategories').doc(category).collection('products')
        .withConverter(this.productConverter).doc(product.model).set(product)
        .then
        (
          res => resolve(res),
          err => reject(err)
        )
    }) 
  }

  getProducts(category: string): Product[]
  {
    const products: Product[] = []

    firebase.firestore().collection('productCategories').doc(category).collection('products').withConverter(this.productConverter).get()
      .then((querySnapshot) =>
        { 
          querySnapshot.forEach((doc) => 
          {
            products.unshift(doc.data())
          })
        })

    return products
  }
}
