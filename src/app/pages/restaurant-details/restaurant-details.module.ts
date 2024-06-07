import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailsPageRoutingModule } from './restaurant-details-routing.module';

import { RestaurantDetailsPage } from './restaurant-details.page';
import {RestaurantIconsComponent} from "../../components/restaurant-icons/restaurant-icons.component"
import {ReviewListItemComponent} from "../../components/review-list-item/review-list-item.component"
import {SlideshowComponent} from "../../components/slideshow/slideshow.component"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantDetailsPageRoutingModule,
    RestaurantIconsComponent,
    ReviewListItemComponent,
    SlideshowComponent
  ],
  declarations: [RestaurantDetailsPage]
})
export class RestaurantDetailsPageModule {

}
