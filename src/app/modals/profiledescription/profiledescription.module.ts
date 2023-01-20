import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfiledescriptionPageRoutingModule } from './profiledescription-routing.module';

import { ProfiledescriptionPage } from './profiledescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfiledescriptionPageRoutingModule
  ],
  declarations: [ProfiledescriptionPage]
})
export class ProfiledescriptionPageModule {}
