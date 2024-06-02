import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Restaurant} from "../../objects/restaurant"
import {ActivatedRoute} from "@angular/router"
import {DataService} from "../../services/data.service"

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements AfterViewInit {
  restaurant?: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {}

  async ngAfterViewInit() {
    this.route.paramMap.subscribe(async params => {
      const restaurantId = params.get('id')

      this.restaurant = await this.data.getRestaurant(Number(restaurantId))
      this.data.selectedRestaurant = this.restaurant
    })
  }

  getTodaySchedule() {
    const today = new Date().getDay() - 1;

    const str = this.restaurant?.schedule[today]

    return str === null
      ? "Fechado"
      : str
  }
}
