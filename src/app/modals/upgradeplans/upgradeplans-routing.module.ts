import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeplansPage } from './upgradeplans.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeplansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeplansPageRoutingModule {}
