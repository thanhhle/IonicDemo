import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  
  selectedIndex = 0
  productPages = [
    {
      title: 'READY-TO-WEAR',
      url: 'ready-to-wear',
      image: './assets/image/ready-to-wear.jpeg'
    },
    {
      title: 'BAGS',
      url: 'bags',
      image: './assets/image/bags.jpeg'
    },
    {
      title: 'ACCESSORIES',
      url: 'accessories',
      image: './assets/image/accessories.jpeg'
    },
  ]
  

  constructor() { }

  ngOnInit() {
  }

}
