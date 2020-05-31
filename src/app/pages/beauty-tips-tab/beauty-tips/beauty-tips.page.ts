import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { BeautyTipDataService } from '../../../services/beauty-tip-data.service'
import { BeautyTip } from '../../../models/beauty-tip.model'

@Component({
  selector: 'app-beauty-tips',
  templateUrl: './beauty-tips.page.html',
  styleUrls: ['./beauty-tips.page.scss'],
})
export class BeautyTipsPage implements OnInit {

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
    const beautyTips: BeautyTip[] = []
    firebase.firestore().collection('beautyTips').orderBy("createdDate", "desc").withConverter(this.beautyTipDataService.beautyTipConverter).get()
      .then(function(querySnapshot)
      {
        querySnapshot.forEach(function(doc) 
        {
          beautyTips.push(doc.data())
        })
      })

    return beautyTips
  }

  navigateToCreateTipPage()
  {   
    this.router.navigate(['home/beauty-tips/create-tip'])
  }

}

