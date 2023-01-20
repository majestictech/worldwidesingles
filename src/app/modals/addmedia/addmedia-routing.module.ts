import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmediaPage } from './addmedia.page';

const routes: Routes = [
  {
    path: '',
    component: AddmediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmediaPageRoutingModule {}
