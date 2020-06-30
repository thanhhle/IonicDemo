import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService 
{
  userConverter = 
  {
    toFirestore(user: User): firebase.firestore.DocumentData
    {
      const userDocumentData: firebase.firestore.DocumentData =
      {
        uid: user.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdDate: user.createdDate,
        lastSignInDate: user.lastSignInDate,
        lastActiveDate: user.lastActiveDate,
        beautyTipIDs: user.beautyTipIDs
      }
      return userDocumentData
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): User
    {
      const data = snapshot.data(options)!
      return new User(data.uid, data.email, data.firstName, data.lastName, data.role, data.createdDate, data.lastSignInDate, data.lastActiveDate, data.beautyTipIDs)
    }
  }

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
              this.updateUserLastSignInDate(uid)
            }
            else
            {
              const user: User = new User(uid, email, displayName.split(' ')[0], displayName.split(' ')[1])
              firebase.firestore().collection('users').withConverter(this.userConverter).doc(user.uid).set(user)
            }
          }
        )
  }

  updateUserLastSignInDate(uid: string)
  {
    firebase.firestore().collection('users').doc(uid).update
    ( 
      { 
        lastActiveDate: new Date(),
        lastSignInDate: new Date() 
      }
    )
  }

  updateUserLastActiveDate(uid: string)
  {
    firebase.firestore().collection('users').doc(uid).update
    ( 
      { 
        lastActiveDate: new Date()
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

  /*
  async deleteBeautyTipID(uid: string, beautyTipID: string)
  {
    const userSnap = await firebase.firestore().collection('users').withConverter(this.userConverter).doc(uid).get();
    const user = userSnap.data();
    const index: number = user.beautyTipIDs.indexOf(beautyTipID);
    if (index !== -1)
    {
      user.beautyTipIDs.splice(index, 1);
    }   
    firebase.firestore().collection('users').doc(user.uid).update(user)
  }
  */

 getBeautyTipIDs(uid: string)
 {
   return new Promise<any>((resolve, reject) => 
   {
     firebase.firestore().collection('users').withConverter(this.userConverter).doc(uid).get()
       .then
       (
         res => resolve(res.data().beautyTipIDs),
         err => reject(err)
       )
   })
 }

 getAllUsers(): User[]
 {
  let users: User[] = []
  firebase.firestore().collection('users').withConverter(this.userConverter).get()
    .then((querySnapshot) =>
      { 
        querySnapshot.forEach(element => {
          console.log("element",element);
        });
      //   querySnapshot.forEach((doc) => 
      //   {
      //     users.unshift(doc.data())
      //   })
      //   console.log("in the then function:", users)
      })
      
      console.log("outside the then functioo:", users)
  return users
 }

 getUser(id: string): User
 {
   let users = this.getAllUsers()
   var user: User
   users.forEach(element => 
    {
      if(element.uid == id)
      {
        user = element
      }
   })
   
   return user
  }
}
