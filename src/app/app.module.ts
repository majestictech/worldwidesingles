import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/Camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilePath } from '@ionic-native/file-path/ngx';
import { SortablejsModule } from 'ngx-sortablejs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SocialService } from './services/social.service';
import { File } from '@ionic-native/file/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot({mode: 'md'}),
   AppRoutingModule, HammerModule,SortablejsModule.forRoot({ animation: 150 }),
   SortablejsModule],
  providers: [{ provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy },Camera,File,
     FilePath,Geolocation,SocialSharing,	SocialService,
     PayPal, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
