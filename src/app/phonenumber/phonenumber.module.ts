import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PhonenumberPageRoutingModule } from './phonenumber-routing.module';

import { PhonenumberPage } from './phonenumber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    PhonenumberPageRoutingModule
  ],
  declarations: [PhonenumberPage]
})
export class PhonenumberPageModule {}
