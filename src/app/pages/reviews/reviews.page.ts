import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {DataService} from "../../services/data.service"
import {Restaurant} from "../../objects/restaurant"
import {DetailedReview} from "../../objects/detailed_review"

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  restaurant?: Restaurant
  reviews?: DetailedReview[]

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.restaurant = this.data.selectedRestaurant
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const restaurantId = params.get('id')

      this.reviews = await this.data.getDetailedReviews(Number(restaurantId))
    })
  }
}
