import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryDataService {

  productCategoryConverter = 
  {
    toFirestore(productCategory: ProductCategory): firebase.firestore.DocumentData
    {
      const productCategoryDocumentData: firebase.firestore.DocumentData =
      {
        name: productCategory.name,
        path: productCategory.path,
        titleImageURL: productCategory.titleImageURL,
      }
      return productCategoryDocumentData
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): ProductCategory
    {
      const data = snapshot.data(options)!
      return new ProductCategory(data.name, data.path, data.titleImageURL)
    }
  }

  constructor() { }

  getAllProductCategories(): ProductCategory[]
  {
    const productCategories: ProductCategory[] = []

    firebase.firestore().collection('productCategories').withConverter(this.productCategoryConverter).get()
      .then((querySnapshot) =>
        { 
          querySnapshot.forEach((doc) => 
          {
            productCategories.unshift(doc.data())
          })
        })

    return productCategories
  }
}
