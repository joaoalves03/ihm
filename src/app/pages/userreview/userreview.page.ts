import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {DataService} from "../../services/data.service"
import {DetailedReview} from "../../objects/detailed_review"

@Component({
  selector: 'app-userreview',
  templateUrl: './userreview.page.html',
  styleUrls: ['./userreview.page.scss'],
})
export class UserreviewPage implements OnInit {
  review?: DetailedReview

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const reviewId = params.get('id')

      this.review = await this.data.getReview(Number(reviewId))
    })
  }

}
