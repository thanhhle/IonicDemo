import { Injectable } from '@angular/core';

import { User } from '../models/user.interface';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService
{
  private platform: Platform;

  constructor( private facebook: Facebook, private googlePlus: GooglePlus, platform: Platform) 
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
            this.updateUserLastSignIn(res.user.uid)
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
                  this.createUserDB(res)
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
          res =>
          {
            this.createUserDB(res)
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
      return this.nativeGoogleAuth()
    }
    else
    {
      return this.browserGoogleAuth()
    }
  }

  nativeGoogleAuth()
  {
    return new Promise<any>((resolve, reject) =>
    {
      this.googlePlus.login({
          'webClientId': '114715601545-r5gjjhq5iu6cv2vhm4k7pmds6gefjh64.apps.googleusercontent.com',
          'offline': true
        })
        .then(
          res => 
          {
            firebase.auth.GoogleAuthProvider.credential()
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken)
            firebase.auth().signInWithCredential(googleCredential)
              .then
              (
                res =>
                {
                  this.createUserDB(res)
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

  browserGoogleAuth()
  {
    return new Promise<any>((resolve, reject) =>
    {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          res =>
          {
            this.createUserDB(res)
            resolve(res)
          },
          err => reject(err)
        )
    })
  }
  

  signOut()
  {
    return new Promise<any>((resolve, reject) =>
    {
      const uid = firebase.auth().currentUser.uid
      firebase.auth().signOut()
        .then
        (
          res =>
          {
            this.updateUserLastActive(uid)
            resolve(res)
          },
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
    firebase.firestore().collection('users').doc(res.user.uid).get()
      .then
      (
        (docSnapshot) => 
        {
          // If user data is already stored in the database
          if (docSnapshot.exists)
          {
            this.updateUserLastSignIn(res.user.uid)
          }
          else
          {
            let user: User =
            {
              uid: res.user.uid,
              email: res.user.email,
              firstName: res.user.displayName.split(' ')[0],
              lastName: res.user.displayName.split(' ')[1],
              createdDate: new Date(),
              lastSignIn: new Date(),
              lastActive: new Date()
            }
        
            firebase.firestore().collection('users').doc(res.user.uid).set(user)
          }
        }
      )
  }

  updateUserLastSignIn(uid: string)
  {
    firebase.firestore().collection('users').doc(uid).set
      ( 
        { lastSignIn: new Date() },
        { merge: true } 
      )
  }

  updateUserLastActive(uid: string)
  {
    firebase.firestore().collection('users').doc(uid).set
      ( 
        { lastActive: new Date() },
        { merge: true } 
      )
  }

}
