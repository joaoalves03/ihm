import {AfterViewInit, Component} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Restaurant } from '../../objects/restaurant';
import { AuthService } from "../../services/auth.service";
import { DetailedReview } from "../../objects/detailed_review";
import {ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements AfterViewInit {
  favoriteRestaurants?: Restaurant[]
  userReviews?: DetailedReview[]

  constructor(
    private data: DataService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  async ngAfterViewInit() {
    this.route.paramMap.subscribe(async _ => {
      await this.loadFavoriteRestaurants()
      await this.loadUserReviews()
    })
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
}
