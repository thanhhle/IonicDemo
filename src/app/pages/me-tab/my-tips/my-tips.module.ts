import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTipsPageRoutingModule } from './my-tips-routing.module';

import { MyTipsPage } from './my-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTipsPageRoutingModule
  ],
  declarations: [MyTipsPage]
})
export class MyTipsPageModule {}
