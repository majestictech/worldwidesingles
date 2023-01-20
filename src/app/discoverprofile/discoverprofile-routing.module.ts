import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverprofilePage } from './discoverprofile.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverprofilePageRoutingModule {}
