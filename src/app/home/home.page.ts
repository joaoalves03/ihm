import { Component } from '@angular/core';
import {NavController} from "@ionic/angular"
import {AuthService} from "../services/auth.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = this.auth.currentUser

  constructor(
    private navCtrl: NavController,
    private auth: AuthService
  ) {}

  openRestaurantDetails() {
    this.navCtrl.navigateForward('/restaurant-details')
  }
}
