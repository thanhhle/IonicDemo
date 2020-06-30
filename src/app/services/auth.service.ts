import { Injectable } from '@angular/core';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { UserDataService } from './user-data.service'


@Injectable({
  providedIn: 'root'
})

export class AuthService
{
  platform: Platform
  userDataService: UserDataService

  constructor(
    private facebook: Facebook,
    private googlePlus: GooglePlus,
    platform: Platform,
    userDataService: UserDataService) 
  {
    this.platform = platform
    this.userDataService = userDataService
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
        .then
        (
          res =>
          {
            res.user.updateProfile({ displayName: firstName + ' ' + lastName })
            this.userDataService.createUser(res.user.uid, res.user.email, res.user.displayName)
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
        .then
        (
          res =>
          {
            this.userDataService.updateUserLastSignInDate(res.user.uid)
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
                  this.userDataService.createUser(res.user.uid, res.user.email, res.user.displayName)
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
            this.userDataService.createUser(res.user.uid, res.user.email, res.user.displayName)
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
                  this.userDataService.createUser(res.user.uid, res.user.email, res.user.displayName)
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
            this.userDataService.createUser(res.user.uid, res.user.email, res.user.displayName)
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
      const uid = this.getCurrentUserID()
      firebase.auth().signOut()
        .then
        (
          res =>
          {
            this.userDataService.updateUserLastActiveDate(uid)
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

  getCurrentUserID()
  {
    return firebase.auth().currentUser.uid
  }

  getCurrentUserName()
  {
    return firebase.auth().currentUser.displayName
  }

}