import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BeautyTipDataService } from '../../../services/beauty-tip-data.service'
import { UserDataService } from '../../../services/user-data.service'
import { AuthService } from '../../../services/auth.service'

import { BeautyTip } from '../../../models/beauty-tip.model'

@Component({
  selector: 'app-my-tips',
  templateUrl: './my-tips.page.html',
  styleUrls: ['./my-tips.page.scss'],
})
export class MyTipsPage implements OnInit {

  selectedIndex = 0

  beautyTipDataService: BeautyTipDataService
  userDataService: UserDataService
  authService: AuthService

  beautyTips: BeautyTip[]

  constructor(private router: Router, beautyTipDataService: BeautyTipDataService, userDataService: UserDataService, authService: AuthService)
  {
    this.userDataService = userDataService
    this.beautyTipDataService = beautyTipDataService
    this.authService = authService
    this.beautyTips = this.getBeautyTips()
  }

  ngOnInit()
  {

  }

  doRefresh(event)
  {
    setTimeout(() => 
    {
      this.beautyTips = this.getBeautyTips()
      event.target.complete();
    }, 500);
 }

  getBeautyTips(): BeautyTip[]
  {
    var beautyTips: BeautyTip[] = []
    this.userDataService.getBeautyTipIDs(this.authService.getCurrentUserID())
      .then
      (
        res => 
        { 
          for (var id of res)
          {
            this.beautyTipDataService.getBeautyTip(id).then(res => beautyTips.unshift(res.data()))
          }
        }
      )

    return beautyTips 
  }
  
  navigateToCreateTipPage()
  {   
    this.router.navigate(['home/beauty-tips/create-tip'])
  }

  navigateToEditTipPage()
  {
    let id = this.beautyTips[this.selectedIndex].id
    this.router.navigateByUrl("home/beauty-tips/edit-tip/" + id)
  }

}
