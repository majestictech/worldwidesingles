import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WholikesyouPageRoutingModule } from './wholikesyou-routing.module';

import { WholikesyouPage } from './wholikesyou.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WholikesyouPageRoutingModule
  ],
  declarations: [WholikesyouPage]
})
export class WholikesyouPageModule {}
