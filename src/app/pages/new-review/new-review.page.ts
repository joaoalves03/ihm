import { Component } from '@angular/core';
import {DataService} from "../../services/data.service"
import {Restaurant} from "../../objects/restaurant"

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.page.html',
  styleUrls: ['./new-review.page.scss'],
})
export class NewReviewPage {
  restaurant?: Restaurant

  constructor(
    private data: DataService
  ) {
    this.restaurant = this.data.selectedRestaurant
  }
}
