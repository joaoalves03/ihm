import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {DataService} from "../../services/data.service"
import {User} from "../../objects/user"
import {DetailedReview} from "../../objects/detailed_review"

@Component({
  selector: 'app-userreview',
  templateUrl: './userreview.page.html',
  styleUrls: ['./userreview.page.scss'],
})
export class UserreviewPage implements OnInit {
  review?: DetailedReview
  user?: User
  reviewImages?: string[]

  loading = true

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const reviewId = params.get('id')

      this.review = await this.data.getDetailedReview(Number(reviewId))
      this.user = await this.data.getUserInfo(this.review.reviewer_id)
      this.reviewImages = await this.data.getReviewImages(this.review.id)

      this.loading = false
    })
  }

  getReviewerPicture(reviewer_id: string) {
    return this.data.getProfilePictureURL(reviewer_id)
  }
}
