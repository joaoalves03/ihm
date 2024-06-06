import { Component } from '@angular/core';
import {DataService} from "../../services/data.service"
import {Restaurant} from "../../objects/restaurant"
import {AuthService} from "../../services/auth.service"
import {LoadingController} from "@ionic/angular"
import {Location} from "@angular/common"

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.page.html',
  styleUrls: ['./new-review.page.scss'],
})
export class NewReviewPage {
  restaurant?: Restaurant

  reviewText = ''
  rating = 0

  constructor(
    private data: DataService,
    private auth: AuthService,
    private loadingController: LoadingController,
    private location: Location,
  ) {
    this.restaurant = this.data.selectedRestaurant
  }

  updateRating(rating: number) {
    this.rating = rating
  }

  async addReview() {
    const loading = await this.loadingController.create()
    await loading.present()

    await this.data.addReview(
      this.restaurant?.id!,
      this.auth.getCurrentUserId()!,
      this.rating,
      this.reviewText
    )

    await loading.dismiss()

    this.location.back()
  }
}
