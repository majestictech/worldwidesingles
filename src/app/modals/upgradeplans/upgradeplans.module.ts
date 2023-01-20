import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeplansPageRoutingModule } from './upgradeplans-routing.module';

import { UpgradeplansPage } from './upgradeplans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpgradeplansPageRoutingModule
  ],
  declarations: [UpgradeplansPage]
})
export class UpgradeplansPageModule {}
