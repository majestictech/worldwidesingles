import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmediaPageRoutingModule } from './addmedia-routing.module';

import { AddmediaPage } from './addmedia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmediaPageRoutingModule
  ],
  declarations: [AddmediaPage]
})
export class AddmediaPageModule {}
