import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beauty-tips',
  templateUrl: './beauty-tips.page.html',
  styleUrls: ['./beauty-tips.page.scss'],
})
export class BeautyTipsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCreatePostPage()
  {
    this.router.navigate(['home/beauty-tips/create-post'])
  }
}
