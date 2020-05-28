import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Your account',
      url: '/menu/manage-account',
      icon: 'person-outline'
    },
    {
      title: 'Your beauty tips',
      url: '/menu/manage-beauty-tips',
      icon: 'bulb-outline'
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public authService: AuthService,
    private alertController: AlertController
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('menu/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  signOut() {
    this.authService.signOut()
      .then(
        async res => {
          const alert = await this.alertController.create({
            header: 'Sign out sucessfully!',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navigateToSignIPage()
              }
            }]
          })
  
          await alert.present()
        },

        async err => {
          const alert = await this.alertController.create({
            header: 'Sign out failed!',
            message: err.message,
            buttons: ['Try again']
          })

          await alert.present()
        }
      )
  }

  navigateToSignIPage()
  {
    this.router.navigate(['sign-in']);
  }

}
