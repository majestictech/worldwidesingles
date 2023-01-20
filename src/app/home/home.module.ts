import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomePage } from './home.page';
import { TinderUIComponent } from '../tinder-ui-component/tinder-ui.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
	ExploreContainerComponentModule
  ],
  declarations: [HomePage,TinderUIComponent]
})
export class HomePageModule {}
