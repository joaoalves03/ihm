import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReviewPageRoutingModule } from './new-review-routing.module';

import { NewReviewPage } from './new-review.page';
import {StarRatingComponent} from "../../components/star-rating/star-rating.component"

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewReviewPageRoutingModule,
        StarRatingComponent
    ],
  declarations: [NewReviewPage]
})
export class NewReviewPageModule {}
