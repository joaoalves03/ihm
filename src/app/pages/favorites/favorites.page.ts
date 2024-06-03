import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Restaurant } from '../../objects/restaurant';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteRestaurants: Restaurant[] = [];


  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.loadFavoriteRestaurants();
  }

  async loadFavoriteRestaurants() {
    // Get the current user's favorite restaurants from the data service
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = this.authService.getCurrentUserId();
      this.favoriteRestaurants = await this.dataService.getFavoriteRestaurants(userId);
    }
  }
}
