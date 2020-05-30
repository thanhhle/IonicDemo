import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { newArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserDataService 
{
  constructor() { }

  createUser(uid: string, email: string, displayName: string)
  {
    firebase.firestore().collection('users').doc(uid).get()
      .then
        (
          (docSnapshot) => 
          {
            // If user data is already stored in the database
            if (docSnapshot.exists)
            {
              this.updateUserLastSignIn(uid)
            }
            else
            {
              let user: User =
              {
                uid: uid,
                email: email,
                firstName: displayName.split(' ')[0],
                lastName: displayName.split(' ')[1],
                createdDate: new Date(),
                lastSignInDate: new Date(),
                lastActiveDate: new Date(),
                beautyTipIDs: []
              }

              firebase.firestore().collection('users').doc(user.uid).set(user)
            }
          }
        )

  }

  updateUserLastSignIn(uid: string)
  {
    firebase.firestore().collection('users').doc(uid).update
    ( 
      { 
        lastSignIn: new Date() 
      }
    )
  }

  updateUserLastActive(uid: string)
  {
    firebase.firestore().collection('users').doc(uid).update
    ( 
      { 
        lastActive: new Date()
      }
    )
  }

  addBeautyTipID(uid: string, beautyTipID: string)
  {
    firebase.firestore().collection('users').doc(uid).update
    (
      {
        beautyTipIDs: firebase.firestore.FieldValue.arrayUnion(beautyTipID)
      }
    )
  }

  deleteBeautyTipID(uid: string, beautyTipID: string)
  {
    
  }
}
