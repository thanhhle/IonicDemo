import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    public authService: AuthService,
    private alertController: AlertController
  ) {}

  signOut() {
    this.authService.signOut()
      .then(
        async res => {
          const alert = await this.alertController.create({
            header: 'Sign out sucessfully!',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navigateToSignInPage()
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

  navigateToSignInPage()
  {
    this.router.navigate(['sign-in']);
  }

}
