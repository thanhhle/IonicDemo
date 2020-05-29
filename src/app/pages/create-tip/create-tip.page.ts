import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.page.html',
  styleUrls: ['./create-tip.page.scss'],
})
export class CreateTipPage implements OnInit {
  title = '';
  description = '';

  constructor(private router: Router, private alertController: AlertController) { }

  async post()
  {
    if (this.title === '' || this.description === '') {
      const validFieldsAlert = await this.alertController.create({
        header: 'Invalid input!',
        message: 'Please fill in all fields.',
        buttons: ['OK']
        })

      return await validFieldsAlert.present()
    }
    
    this.router.navigate(['home/beauty-tips'])
  }

  ngOnInit() {
  }

  
}
