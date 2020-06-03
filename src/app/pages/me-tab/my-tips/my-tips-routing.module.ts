import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTipsPage } from './my-tips.page';

const routes: Routes = [
  {
    path: '',
    component: MyTipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTipsPageRoutingModule {}
