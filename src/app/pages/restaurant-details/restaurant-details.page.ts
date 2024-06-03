import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../objects/restaurant';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements AfterViewInit {
  diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]

  restaurant?: Restaurant;
  isFavorite: boolean = false;

  isModalOpen = false

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private authService: AuthService
  ) {
  }

  async ngAfterViewInit() {
    this.route.paramMap.subscribe(async params => {
      const restaurantId = params.get('id');
      this.restaurant = await this.data.getRestaurant(Number(restaurantId));
      this.data.selectedRestaurant = this.restaurant;

      const user = this.authService.getCurrentUser();
      if (user && this.restaurant) {
        const userId = this.authService.getCurrentUserId();
        const restaurantId = this.restaurant.id;
        this.isFavorite = await this.data.isFavorite(userId, restaurantId);
      }
    });
  }

  getTodaySchedule() {
    const today = new Date().getDay() - 1;
    return this.restaurant?.schedule[today];
  }

  async toggleFavorite() {
    const user = this.authService.getCurrentUser();
    if (user && this.restaurant) {
      const user_id = this.authService.getCurrentUserId();
      const restaurantId = this.restaurant.id;
      if (this.isFavorite) {
        // Unfavorite the restaurant by deleting the favorite entry from the database
        await this.data.deleteFavorite(user_id, restaurantId);
        this.isFavorite = false;
      } else {
        // Favorite the restaurant by adding the favorite entry to the database
        await this.data.toggleFavorite(user_id, restaurantId);
        this.isFavorite = true;
      }
    } else {
      console.log('User not authenticated or restaurant not loaded');
    }
  }

}
