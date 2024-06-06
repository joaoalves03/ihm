import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service"
import {DetailedReview} from "../../objects/detailed_review"
import {IonicModule} from "@ionic/angular"
import {RouterLink} from "@angular/router"

@Component({
  selector: 'app-review-list-item',
  templateUrl: './review-list-item.component.html',
  styleUrls: ['./review-list-item.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true
})
export class ReviewListItemComponent  implements OnInit {
  @Input() review?: DetailedReview

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {}

  getReviewerPicture(reviewer_id: string) {
    return this.data.getProfilePictureURL(reviewer_id)
  }

  onImageError(event: ErrorEvent) {
    let img = (event.currentTarget as HTMLImageElement)
    img.onerror = null
    img.src = "assets/default.jpg"
  }
}
