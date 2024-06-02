import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {Review} from "../../objects/review"
import {DataService} from "../../services/data.service"
import {Restaurant} from "../../objects/restaurant"

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  restaurant?: Restaurant
  reviews?: Review[]

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.restaurant = this.data.selectedRestaurant
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const restaurantId = params.get('id')

      this.reviews = await this.data.getReviews(Number(restaurantId))
    })
  }
}
