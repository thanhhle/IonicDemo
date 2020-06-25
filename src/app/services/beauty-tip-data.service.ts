import { Injectable } from '@angular/core';
import { BeautyTip } from '../models/beauty-tip.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { AuthService } from './auth.service'
import { UserDataService } from './user-data.service'

@Injectable({
  providedIn: 'root'
})
export class BeautyTipDataService 
{
  authService: AuthService
  userDataService: UserDataService
  beautyTipConverter = 
  {
    toFirestore(beautyTip: BeautyTip): firebase.firestore.DocumentData
    {
      const tipDocumentData: firebase.firestore.DocumentData =
      {
        id: beautyTip.id,
        author: beautyTip.author,
        title: beautyTip.title,
        description: beautyTip.description,
        createdDate: beautyTip.createdDate,
        lastUpdatedDate: beautyTip.lastUpdatedDate,
      }
      return tipDocumentData
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): BeautyTip
    {
      const data = snapshot.data(options)!
      return new BeautyTip(data.id, data.author, data.title, data.description, data.createdDate, data.lastUpdatedDate)
    }
  }

  constructor(authService: AuthService, userDataService: UserDataService)
  { 
    this.authService = authService
    this.userDataService = userDataService
  }

  createBeautyTip(title: string, description: string)
  {
    return new Promise<any>((resolve, reject) => 
    {
      let id = this.authService.getCurrentUserID() + new Date().getTime(),
          author = this.authService.getCurrentUserName()

      const beautyTip = new BeautyTip(id, author, title, description)
      
      firebase.firestore().collection('beautyTips').withConverter(this.beautyTipConverter).doc(beautyTip.id).set(beautyTip)
        .then
        (
          res => 
          {
            this.userDataService.addBeautyTipID(this.authService.getCurrentUserID(), beautyTip.id)
            resolve(res)
          },
          err => reject(err)
        )
    }) 
  }

  updateBeautyTip(id: string, title: string, description: string)
  {
    return new Promise<any>((resolve, reject) => 
    {
      firebase.firestore().collection('beautyTips').doc(id).update
        ( 
          { 
            title: title,
            description: description,
            lastUpdatedDate: new Date() 
          }
        )
        .then
        (
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  /*
  deleteBeautyTip(id: string)
  {
    return new Promise<any>((resolve, reject) => 
    {
      firebase.firestore().collection('beautyTips').doc(id).delete()
        .then
        (
          res => 
          {
            this.userDataService.deleteBeautyTipID(this.authService.getCurrentUserID(), id)
            resolve(res)
          },
          err => reject(err)
        )
    })
  }
  */

  
  getBeautyTip(id: string)
  {
    return new Promise<any>((resolve, reject) => 
    {
      firebase.firestore().collection('beautyTips').withConverter(this.beautyTipConverter).doc(id).get()
        .then
        (
          res => resolve(res),
          err => reject(err) 
        )
    })
  }

  getAllBeautyTips(): BeautyTip[]
  {
    const beautyTips: BeautyTip[] = []

    firebase.firestore().collection('beautyTips').orderBy("createdDate", "desc").withConverter(this.beautyTipConverter).get()
      .then((querySnapshot) =>
        { 
          querySnapshot.forEach((doc) => 
          {
            beautyTips.push(doc.data())
          })
        })

    return beautyTips
  }
}
