import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadyToWearPageRoutingModule } from './ready-to-wear-routing.module';

import { ReadyToWearPage } from './ready-to-wear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadyToWearPageRoutingModule
  ],
  declarations: [ReadyToWearPage]
})
export class ReadyToWearPageModule {}
