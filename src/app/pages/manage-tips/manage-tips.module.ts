import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTipsPageRoutingModule } from './manage-tips-routing.module';

import { ManageTipsPage } from './manage-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTipsPageRoutingModule
  ],
  declarations: [ManageTipsPage]
})
export class ManageTipsPageModule {}
