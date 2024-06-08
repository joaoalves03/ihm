import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../objects/restaurant"
import {NavController} from "@ionic/angular"
import {DataService} from "../../services/data.service"

@Component({
  selector: 'app-restaurant-card-simple',
  templateUrl: './restaurant-card-simple.component.html',
  styleUrls: ['./restaurant-card-simple.component.scss'],
})
export class RestaurantCardSimpleComponent  implements OnInit {
  @Input() restaurant?: Restaurant

  image?: string

  constructor(
    private navCtrl: NavController,
    private data: DataService
  ) { }

  async ngOnInit() {
    const images = await this.data.getRestaurantImages(this.restaurant?.id!)

    if(images.length == 0) {
      this.image = "assets/noimage.png"
      return
    }

    this.image = images[Math.floor(Math.random() * images.length)]
  }

  openRestaurantDetails() {
    this.navCtrl.navigateForward(`/restaurant-details/${this.restaurant?.id}`)
  }
}
