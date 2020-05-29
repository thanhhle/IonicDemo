import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTipsPage } from './manage-tips.page';

const routes: Routes = [
  {
    path: '',
    component: ManageTipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageTipsPageRoutingModule {}
