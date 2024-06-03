import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {RestaurantCardSimpleComponent} from "../../components/restaurant-card-simple/restaurant-card-simple.component"
import {RestaurantIconsComponent} from "../../components/restaurant-icons/restaurant-icons.component"
import {RestaurantCardComponent} from "../../components/restaurant-card/restaurant-card.component"


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    RestaurantIconsComponent,
    RestaurantCardComponent
  ],
    exports: [
        RestaurantCardSimpleComponent,
    ],
    declarations: [HomePage, RestaurantCardSimpleComponent]
})
export class HomePageModule {}
