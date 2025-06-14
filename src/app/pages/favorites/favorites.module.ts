import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import {HomePageModule} from "../home/home.module";
import {ReviewListItemComponent} from "../../components/review-list-item/review-list-item.component"

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavoritesPageRoutingModule,
        HomePageModule,
        ReviewListItemComponent
    ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
