import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeautyTipsPageRoutingModule } from './beauty-tips-routing.module';

import { BeautyTipsPage } from './beauty-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeautyTipsPageRoutingModule
  ],
  declarations: [BeautyTipsPage]
})
export class BeautyTipsPageModule {}
