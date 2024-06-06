import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Restaurant } from '../../objects/restaurant';
import { AuthService } from "../../services/auth.service";
import { DetailedReview } from "../../objects/detailed_review";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteRestaurants: Restaurant[] = [];
  userReviews: DetailedReview[] = [];

  constructor(private data: DataService, private authService: AuthService) {}

  ngOnInit() {
    this.loadFavoriteRestaurants();
    this.loadUserReviews();
  }

  async loadFavoriteRestaurants() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.favoriteRestaurants = await this.data.getFavoriteRestaurants(userId);
    }
  }

  async loadUserReviews() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userReviews = await this.data.getUserReviews(userId);
    }
  }

  getReviewerPicture(reviewer_id: string) {
    return this.data.getProfilePictureURL(reviewer_id);
  }

  onImageError(event: ErrorEvent) {
    let img = event.currentTarget as HTMLImageElement;
    img.onerror = null;
    img.src = "assets/default.jpg";
  }
}
