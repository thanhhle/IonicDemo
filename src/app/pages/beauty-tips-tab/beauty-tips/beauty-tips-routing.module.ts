import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeautyTipsPage } from './beauty-tips.page';

const routes: Routes = [
  {
    path: '',
    component: BeautyTipsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeautyTipsPageRoutingModule {}
