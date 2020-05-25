import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  email = '';
  password = '';
  firstName = ''
  lastName = ''

  constructor(
    private router: Router,
    public authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async signUp() {
    
    if (this.email === '' || this.password === '' || this.firstName === '' || this.lastName === '') {
      const validFieldsAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please fill in all fields.',
        buttons: ['OK']
        })

      return await validFieldsAlert.present()
    }

    this.authService.signUp(this.email, this.password, this.firstName, this.lastName)
    .then(
      async res => {
        const alert = await this.alertController.create({
          header: 'Account created sucessfully!',
          message: 'Please log in to continue.',
          buttons: [{
            text: 'Log In',
            handler: () => {
              this.navigateToSignInPage()
            }
          }]
        })

        await alert.present()
      },

      async err => {
        const alert = await this.alertController.create({
          header: 'Account created failed!',
          message: err.message,
          buttons: ['OK']
        })

        await alert.present()
      }
    )
  }

  navigateToSignInPage()
  {
    this.router.navigate(['sign-in'])
  }

}
