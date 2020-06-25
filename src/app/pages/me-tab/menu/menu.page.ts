import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedIndex = 0
  menuPages = [
    {
      title: 'My Account',
      url: 'my-account',
      icon: 'person-outline'
    },
    {
      title: 'My Tips',
      url: 'my-tips',
      icon: 'bulb-outline'
    },
    {
      title: 'My Cart',
      url: 'my-cart',
      icon: 'cart-outline'
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) 
  {

  }


  ngOnInit() {
 
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
