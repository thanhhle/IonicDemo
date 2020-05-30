import { Injectable } from '@angular/core';
import { BeautyTip } from '../models/beauty-tip.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { AuthService } from './auth.service'
import { UserDataService } from './user-data.service'

@Injectable({
  providedIn: 'root'
})
export class BeautyTipDataService {

  authService: AuthService
  userDataService: UserDataService;


  constructor(
    authService: AuthService,
    userDataService: UserDataService)
  { 
    this.authService = authService
    this.userDataService = userDataService
  }

  createBeautyTip(title: string, description: string)
  {
    return new Promise<any>((resolve, reject) => 
    {
      let beautyTip: BeautyTip = 
      {
        id: this.authService.getCurrentUser() + new Date().getTime(),
        author: this.authService.getCurrentUser(),
        title: title,
        description: description,
        createdDate: new Date(),
        lastEditDate: new Date()
      }

      firebase.firestore().collection('beautyTips').doc(beautyTip.id).set(beautyTip)
        .then
        (
          res => 
          {
            this.userDataService.addBeautyTipID(beautyTip.author, beautyTip.id)
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
      firebase.firestore().collection('beautyTips').doc(id).set
        ( 
          { 
            title: title,
            description: description,
            lastEditDate: new Date() 
          },
          { merge: true } 
        )
        .then
        (
          res => resolve(res),
          err => reject(err)
        )
    })
  }
}
