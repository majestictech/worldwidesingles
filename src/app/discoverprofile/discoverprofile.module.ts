import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverprofilePageRoutingModule } from './discoverprofile-routing.module';

import { DiscoverprofilePage } from './discoverprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverprofilePageRoutingModule
  ],
  declarations: [DiscoverprofilePage]
})
export class DiscoverprofilePageModule {}
