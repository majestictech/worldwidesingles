import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportuserPageRoutingModule } from './reportuser-routing.module';

import { ReportuserPage } from './reportuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportuserPageRoutingModule
  ],
  declarations: [ReportuserPage]
})
export class ReportuserPageModule {}
