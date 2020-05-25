import { Injectable } from '@angular/core';

import { User } from '../models/user.interface';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platform: Platform;

  constructor( private facebook: Facebook, platform: Platform) 
  {
    this.platform = platform;
  }

  signUp(email: string, password: string, firstName: string, lastName: string)
  {
    firstName = firstName.replace(/^\s+|\s+$/g, '');
    lastName = lastName.replace(/^\s+|\s+$/g, '');
    email = email.replace(/^\s+|\s+$/g, '');
    password = password.replace(/\r?\n|\r/g, '')

    return new Promise<any>((resolve, reject) =>
    {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          res =>
          {
            res.user.updateProfile({ displayName: firstName + ' ' + lastName })
            this.createUserDB(res)
            resolve(res)
          },
          err => reject(err)
        
        )
    })
  }

  signIn(email: string, password: string)
  {
    email = email.replace(/^\s+|\s+$/g, '');
    password = password.replace(/\r?\n|\r/g, '')

    return new Promise<any>((resolve, reject) =>
    {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          res =>
          {
            this.updateUserLastActive(res)
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  signInWithFacebook()
  {
    if (this.platform.is('hybrid'))
    {
      return this.nativeFacebookAuth()
    }
    else
    {
      return this.browserFacebookAuth()
    }
  }

  nativeFacebookAuth()
  {
    return new Promise<any>((resolve, reject) =>
    {
      this.facebook.login(["public_profile", "email"])
        .then(
          res => 
          {
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
            firebase.auth().signInWithCredential(facebookCredential)
              .then
              (
                res =>
                {
                  if (this.userIsCreated(res.user.uid) === false)
                  {
                    this.createUserDB(res)
                  }
                  else
                  {
                    this.updateUserLastActive(res)
                  }
                  resolve(res)
                },
                err => reject(err)
              )
            resolve(res)
          },
          err => reject(err)
      )
    })
  }

  browserFacebookAuth()
  {
    return new Promise<any>((resolve, reject) =>
    {
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(
          res => {
            if (this.userIsCreated(res.user.uid) === false)
            {
              this.createUserDB(res)
            }
            else
            {
              this.updateUserLastActive(res)
            }
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  signInWithGoogle()
  {
    if (this.platform.is('hybrid'))
    {
      return this.nativeFacebookAuth()
    }
    else
    {
      return this.browserFacebookAuth()
    }
  }

  signOutUser()
  {
    return new Promise<any>((resolve, reject) =>
    {
      firebase.auth().signOut()
        .then
        (
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  sendPasswordResetEmail(email: string)
  {
    email = email.replace(/^\s+|\s+$/g, '');
    
    return new Promise<any>((resolve, reject) =>
    {
      firebase.auth().sendPasswordResetEmail(email)
        .then
        (
          res => resolve(res),
          err => reject(err)
        )
    })
  }


  createUserDB(res: firebase.auth.UserCredential)
  {
    let user: User =
      {
        uid: res.user.uid,
        email: res.user.email,
        firstName: res.user.displayName.split(' ')[0],
        lastName: res.user.displayName.split(' ')[1],
        createdDate: new Date(),
        lastActive: new Date()
      }
      
    firebase.firestore().collection('users').doc(res.user.uid).set(user)
  }


  updateUserLastActive(res: firebase.auth.UserCredential)
  {
    firebase.firestore().collection('users').doc(res.user.uid).set
      ( 
        { lastActive: new Date() },
        { merge: true } 
      )
  }

  userIsCreated(uid: string): boolean
  {
    var isCreated: boolean
    firebase.firestore().collection('users').doc(uid).get()
      .then
      (
        (docSnapshot) => { isCreated = docSnapshot.exists }
      )

    console.log('User Exists')  

    return isCreated
  }
}
