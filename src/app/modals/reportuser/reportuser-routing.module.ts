import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportuserPage } from './reportuser.page';

const routes: Routes = [
  {
    path: '',
    component: ReportuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportuserPageRoutingModule {}
