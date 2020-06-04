import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BeautyTipDataService } from '../../../services/beauty-tip-data.service'
import { BeautyTip } from '../../../models/beauty-tip.model'

@Component({
  selector: 'app-beauty-tips',
  templateUrl: './beauty-tips.page.html',
  styleUrls: ['./beauty-tips.page.scss'],
})
export class BeautyTipsPage implements OnInit {

  selectedIndex = 0

  beautyTipDataService: BeautyTipDataService
  beautyTips: BeautyTip[]

  constructor(private router: Router, beautyTipDataService: BeautyTipDataService)
  {
    this.beautyTipDataService = beautyTipDataService
    this.beautyTips = this.getBeautyTips()
  }

  ngOnInit() {
    
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
    return this.beautyTipDataService.getAllBeautyTips()
  }

  navigateToCreateTipPage()
  {   
    this.router.navigate(['home/beauty-tips/create-tip'])
  }


  navigateToEditTipPage()
  {
    // let id = this.beautyTips[this.selectedIndex].id
    //this.router.navigateByUrl("home/beauty-tips/edit-tip/" + id)
  }

}

