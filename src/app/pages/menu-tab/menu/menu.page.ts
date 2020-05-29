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
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Your Account',
      url: 'manage-account',
      icon: 'person-outline'
    },
    {
      title: 'Your Tips',
      url: 'manage-tips',
      icon: 'bulb-outline'
    },
  ]

  constructor(
    private router: Router,
    public authService: AuthService,
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
