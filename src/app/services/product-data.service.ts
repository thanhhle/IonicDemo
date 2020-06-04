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
        price: product.price
      }
      return productDocumentData
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Product
    {
      const data = snapshot.data(options)!
      return new Product(data.model, data.name, data.imageURL, data.price)
    }
  }

  constructor() { }

  /*
  getProductCategories(): string[]
  {
    const categories: string[] = []
      firebase.firestore().collection('productCategories').get()
        .then(querySnapshot => 
          {
            querySnapshot.forEach((doc) => 
            {
              categories.unshift(doc.id);
            })
          })
    return categories
  }
  */
}
