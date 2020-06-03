import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { BeautyTipDataService } from '../../../services/beauty-tip-data.service'
import { BeautyTip } from '../../../models/beauty-tip.model'

@Component({
  selector: 'app-edit-tip',
  templateUrl: './edit-tip.page.html',
  styleUrls: ['./edit-tip.page.scss'],
})
export class EditTipPage implements OnInit {

  beautyTip: BeautyTip
  beautyTipDataService: BeautyTipDataService

  constructor(private route: ActivatedRoute, beautyTipDataService: BeautyTipDataService)
  {
    this.beautyTipDataService = beautyTipDataService
  }

  ngOnInit() {

  }
}
