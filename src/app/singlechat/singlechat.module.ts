import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglechatPageRoutingModule } from './singlechat-routing.module';

import { SinglechatPage } from './singlechat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    SinglechatPageRoutingModule
  ],
  declarations: [SinglechatPage]
})
export class SinglechatPageModule {}
