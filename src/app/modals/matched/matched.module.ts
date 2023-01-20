import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchedPageRoutingModule } from './matched-routing.module';

import { MatchedPage } from './matched.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchedPageRoutingModule
  ],
  declarations: [MatchedPage]
})
export class MatchedPageModule {}
