import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfiledescriptionPage } from './profiledescription.page';

const routes: Routes = [
  {
    path: '',
    component: ProfiledescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiledescriptionPageRoutingModule {}
