import { Component, OnInit, Input } from '@angular/core';
import {Restaurant} from "../../objects/restaurant"
import {RestaurantIconsComponent} from "../restaurant-icons/restaurant-icons.component"
import {IonicModule, NavController} from "@ionic/angular"
import {DataService} from "../../services/data.service"
import {NgIf} from "@angular/common"

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  imports: [
    RestaurantIconsComponent,
    IonicModule,
    NgIf
  ],
  standalone: true
})
export class RestaurantCardComponent  implements OnInit {
  @Input() restaurant?: Restaurant

  image?: string
  distance = Math.floor(Math.random() * 10) + 1

  constructor(
    private navCtrl: NavController,
    private data: DataService
  ) { }

  openRestaurantDetails() {
    this.navCtrl.navigateForward(`/restaurant-details/${this.restaurant?.id}`)
  }

  async ngOnInit() {
    const images = await this.data.getRestaurantImages(this.restaurant?.id!)

    if(images.length == 0) {
      this.image = "assets/noimage.png"
      return
    }

    this.image = images[Math.floor(Math.random() * images.length)]
  }
}
