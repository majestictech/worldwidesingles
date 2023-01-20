import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegsiterPage } from './regsiter.page';

const routes: Routes = [
  {
    path: '',
    component: RegsiterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegsiterPageRoutingModule {}
