import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegsiterPageRoutingModule } from './regsiter-routing.module';

import { RegsiterPage } from './regsiter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegsiterPageRoutingModule
  ],
  declarations: [RegsiterPage]
})
export class RegsiterPageModule {}
