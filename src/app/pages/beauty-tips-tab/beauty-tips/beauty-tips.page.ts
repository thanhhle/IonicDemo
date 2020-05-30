import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-beauty-tips',
  templateUrl: './beauty-tips.page.html',
  styleUrls: ['./beauty-tips.page.scss'],
})
export class BeautyTipsPage implements OnInit {

  selectedIndex = 0

  constructor
  (
    private router: Router,
  )
  {
    
  }

  ngOnInit() {
    
  }

  navigateToCreateTipPage()
  {   
    this.router.navigate(['home/beauty-tips/create-tip'])
  }

}
