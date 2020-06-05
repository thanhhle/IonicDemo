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
      return new Product(data.name, data.imageURL, data.description, data.price)
    }
  }

  constructor() { }

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
