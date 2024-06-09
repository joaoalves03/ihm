import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {DataService} from "../../services/data.service"
import {User} from "../../objects/user"
import {DetailedReview} from "../../objects/detailed_review"
import {AuthService} from "../../services/auth.service"
import {ReviewHelpfulness} from "../../objects/reviewHelpfulness"
import {AlertController} from "@ionic/angular"
import {Location} from "@angular/common"

@Component({
  selector: 'app-userreview',
  templateUrl: './userreview.page.html',
  styleUrls: ['./userreview.page.scss'],
})
export class UserreviewPage implements OnInit {
  review?: DetailedReview
  user?: User
  reviewImages?: string[]
  reviewHelpfulnessScore?: ReviewHelpfulness
  helpful?: boolean | null

  loading = true

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService,
    private data: DataService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const reviewId = params.get('id')

      this.review = await this.data.getDetailedReview(Number(reviewId))
      this.user = await this.data.getUserInfo(this.review.reviewer_id)
      this.reviewImages = await this.data.getReviewImages(this.review.id)

      this.reviewHelpfulnessScore = await this.data.getReviewHelpfulnessScore(this.review.id)

      this.helpful = await this.data.getReviewHelpfulness(this.review.id, this.auth.getCurrentUserId()!)

      this.loading = false
    })
  }

  getReviewerPicture(reviewer_id: string) {
    return this.data.getProfilePictureURL(reviewer_id)
  }

  async updateReviewHelpfulness(value: boolean | null) {
    if (this.isOwnReview()) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Não é possível dar pontuação à sua própria avaliação.',
        buttons: ['OK']
      })

      await alert.present()
      return
    }

    if (value === this.helpful) {
      if (value) {
        this.reviewHelpfulnessScore!.helpful -= 1
      } else if (value === false) {
        this.reviewHelpfulnessScore!.not_helpful -= 1
      }
      value = null;
    } else {
      if (value) {
        this.reviewHelpfulnessScore!.helpful += 1
      } else if (value === false) {
        this.reviewHelpfulnessScore!.not_helpful += 1
      }

      if (this.helpful) {
        this.reviewHelpfulnessScore!.helpful -= 1
      } else if (this.helpful === false) {
        this.reviewHelpfulnessScore!.not_helpful -= 1
      }
    }

    this.helpful = value

    await this.data.updateReviewHelpfulness(this.auth.getCurrentUserId()!, this.review?.id!, value)
  }

  isOwnReview() {
    return this.user?.id == this.auth.getCurrentUserId()
  }

  async deleteReview() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja mesmo apagar esta avaliação?',
      buttons: [
        {text: 'Não', role: 'no'},
        {text: 'Sim', role: 'yes'}
      ],
    })

    await alert.present()

    alert.onDidDismiss().then(async (data) => {
      if(data.role == 'yes') {
        await this.data.deleteReview(this.review?.id!)
        this.location.back()
      }
    })
  }

  onImageError(event: ErrorEvent) {
    let img = (event.currentTarget as HTMLImageElement)
    img.onerror = null
    img.src = "assets/default.jpg"
  }
}
