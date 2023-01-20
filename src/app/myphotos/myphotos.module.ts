import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MyphotosPageRoutingModule } from './myphotos-routing.module';

import { MyphotosPage } from './myphotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    MyphotosPageRoutingModule
  ],
  declarations: [MyphotosPage]
})
export class MyphotosPageModule {}
