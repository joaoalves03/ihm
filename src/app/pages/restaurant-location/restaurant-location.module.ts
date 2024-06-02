import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantLocationPageRoutingModule } from './restaurant-location-routing.module';

import { RestaurantLocationPage } from './restaurant-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantLocationPageRoutingModule
  ],
  declarations: [RestaurantLocationPage]
})
export class RestaurantLocationPageModule {}
