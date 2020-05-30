import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BeautyTipDataService } from '../../../services/beauty-tip-data.service';

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.page.html',
  styleUrls: ['./create-tip.page.scss'],
})
export class CreateTipPage implements OnInit {
  title = '';
  description = '';

  constructor(
    private router: Router,
    private beautyTipDataService: BeautyTipDataService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async postTip()
  {
    if (this.title === '' || this.description === '') {
      const validFieldsAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please fill in all fields.',
        buttons: ['OK']
        })

      return await validFieldsAlert.present()
    }

    this.beautyTipDataService.createBeautyTip(this.title, this.description)
      .then
      (
        async res => 
        {
          const alert = await this.alertController.create({
            header: 'Tip posted sucessfully!',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigate(['home/beauty-tips'])
              }
            }]
          })

          await alert.present()
        },

        async err => 
        {
          const alert = await this.alertController.create({
            header: 'Tip posted failed!',
            message: err.message,
            buttons: ['Try again']
          })

          await alert.present()
        }
      )
  }
}
