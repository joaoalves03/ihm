import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import {RestaurantCardComponent} from "../../components/restaurant-card/restaurant-card.component"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    RestaurantCardComponent
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
