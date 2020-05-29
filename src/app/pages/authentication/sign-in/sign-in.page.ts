import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    private alertController: AlertController
   ) { }

  ngOnInit() { }

  async signIn() {
    if (this.email === '' || this.password === '') {
      const validFieldsAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please fill in all fields.',
        buttons: ['OK']
        })

      return await validFieldsAlert.present()
    }

    this.authService.signIn(this.email, this.password)
      .then(
        res => {
          this.navigateToHomePage()
        },
        async err => {
          const alert = await this.alertController.create({
            header: 'Sign in failed!',
            message: err.message,
            buttons: ['Try again']
          })

          await alert.present()
        }
      )
  }

  async signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(
        res => {
          this.navigateToHomePage()
        },
        async err => {
          const alert = await this.alertController.create({
            header: 'Sign in failed!',
            message: err.message,
            buttons: ['Try again']
          })

          await alert.present()
        }
      )
  }

  async signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(
        res => {
          this.navigateToHomePage()
        },
        async err => {
          const alert = await this.alertController.create({
            header: 'Sign in failed!',
            message: err.message,
            buttons: ['Try again']
          })

          await alert.present()
        }
      )
  }

  navigateToSignUpPage() {
    this.router.navigate(['sign-up'])
  }

  navigateToForgotPasswordPage() {
    this.router.navigate(['forgot-password'])
  }

  navigateToHomePage() {
    this.router.navigate(['home'])
  }

}
