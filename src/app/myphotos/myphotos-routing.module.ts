import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyphotosPage } from './myphotos.page';

const routes: Routes = [
  {
    path: '',
    component: MyphotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyphotosPageRoutingModule {}
