import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {NavbarComponent} from "../components/navbar/navbar.component"
import {RestaurantCardComponent} from "../components/restaurant-card/restaurant-card.component"
import {RestaurantCardSimpleComponent} from "../components/restaurant-card-simple/restaurant-card-simple.component"


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NavbarComponent, RestaurantCardComponent, RestaurantCardSimpleComponent]
})
export class HomePageModule {}
