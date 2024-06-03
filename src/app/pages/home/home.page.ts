import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular"
import {AuthService} from "../../services/auth.service"
import {DataService} from "../../services/data.service"
import {Restaurant} from "../../objects/restaurant"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user = this.auth.getCurrentUser()
  welcome_message = ''
  search_text = ''

  restaurants: Restaurant[] = []

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private data: DataService,
  ) {
    // TODO: Fix delay
    this.user.subscribe((user) => {
      if(user && user.user_metadata['name'] !== undefined) {
        this.welcome_message = `Olá, ${user.user_metadata['name']}`
      } else {
        this.welcome_message = 'Bem-vindo!'
      }
    })
  }

  openRestaurantDetails(id: number) {
    this.navCtrl.navigateForward(`/restaurant-details/${id}`)
  }

  handleInput(event: any) {
    this.search_text = event.target.value
  }

  search() {
    this.navCtrl.navigateForward(`/search`, {
      queryParams: {
        query: this.search_text
      }
    })
  }

  async ngOnInit() {
    const restaurants = await this.data.getRestaurants()

    this.restaurants = restaurants.sort(() => 0.5 - Math.random()).slice(0, 4)
  }
}
