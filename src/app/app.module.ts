import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hotspot } from '@ionic-native/hotspot/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import {HttpClientModule } from '@angular/common/http';
import {GoogleMaps} from '@ionic-native/google-maps/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts'
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserModule, 
    ChartsModule,
    NgxEchartsModule,
    //[BrowserAnimationsModule]
    Ng2GoogleChartsModule,
     
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Hotspot,
    Facebook,
    Network,
    GoogleMaps,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
