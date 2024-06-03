import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../objects/restaurant"
import {NavController} from "@ionic/angular"

@Component({
  selector: 'app-restaurant-card-simple',
  templateUrl: './restaurant-card-simple.component.html',
  styleUrls: ['./restaurant-card-simple.component.scss'],
})
export class RestaurantCardSimpleComponent  implements OnInit {
  @Input() restaurant?: Restaurant

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  openRestaurantDetails() {
    this.navCtrl.navigateForward(`/restaurant-details/${this.restaurant?.id}`)
  }
}
