import { Component, OnInit, Input } from '@angular/core';
import {Restaurant} from "../../objects/restaurant"
import {RestaurantIconsComponent} from "../restaurant-icons/restaurant-icons.component"
import {NavController} from "@ionic/angular"

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  imports: [
    RestaurantIconsComponent
  ],
  standalone: true
})
export class RestaurantCardComponent  implements OnInit {
  @Input() restaurant?: Restaurant

  distance = Math.floor(Math.random() * 10) + 1

  constructor(
    private navCtrl: NavController
  ) { }

  openRestaurantDetails() {
    this.navCtrl.navigateForward(`/restaurant-details/${this.restaurant?.id}`)
  }

  ngOnInit() {}
}
