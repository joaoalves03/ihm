import {Component} from '@angular/core';
import {NavController} from "@ionic/angular"
import {AuthService} from "../../services/auth.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = this.auth.getCurrentUser()
  welcome_message = ''

  constructor(
    private navCtrl: NavController,
    private auth: AuthService
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

  openRestaurantDetails() {
    this.navCtrl.navigateForward('/restaurant-details')
  }
}
