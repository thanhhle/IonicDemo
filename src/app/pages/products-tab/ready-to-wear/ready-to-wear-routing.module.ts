import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadyToWearPage } from './ready-to-wear.page';

const routes: Routes = [
  {
    path: '',
    component: ReadyToWearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyToWearPageRoutingModule {}
