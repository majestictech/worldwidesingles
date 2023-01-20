import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionlostPageRoutingModule } from './connectionlost-routing.module';

import { ConnectionlostPage } from './connectionlost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionlostPageRoutingModule
  ],
  declarations: [ConnectionlostPage]
})
export class ConnectionlostPageModule {}
