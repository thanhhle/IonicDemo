import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  registeredEmail = ''

  constructor(
    private router: Router,
    public authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async sendPasswordResetEmail() {

    if (this.registeredEmail === '') {
      const validFieldAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please fill in your registered email.',
        buttons: ['OK']
        })

      return await validFieldAlert.present()
    }

    this.authService.sendPasswordResetEmail(this.registeredEmail)
    .then(
      async res => {
        const alert = await this.alertController.create({
          header: 'Email sent successfully!',
          message: 'Please check your email and click on the provided link to reset your password.',
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
          header: 'Email sent failed!',
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