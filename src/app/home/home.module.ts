import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MapComponent} from '../components/map/map.component'

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage, MapComponent]
})
export class HomePageModule {}
