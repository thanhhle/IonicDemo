import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0
  public appPages = [
    {
      title: 'Products',
      url: 'home/product-categories',
      icon: 'basket-outline'
    },
    {
      title: 'Add Product',
      url: 'home/add-product',
      icon: 'add-outline'
    },
    {
      title: 'Beauty Tips',
      url: 'home/beauty-tips',
      icon: 'bulb-outline'
    },
    {
      title: 'Me',
      url: 'home/menu',
      icon: 'person-circle-outline'
    }
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /*
  ngOnInit() {
    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  */
}
