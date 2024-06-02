import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet'
import {DataService} from "../../services/data.service"
import {restaurant} from "ionicons/icons"
import {Restaurant} from "../../objects/restaurant"

// https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet

@Component({
  selector: 'app-restaurant-location',
  templateUrl: './restaurant-location.page.html',
  styleUrls: ['./restaurant-location.page.scss'],
})
export class RestaurantLocationPage implements AfterViewInit {
  private map?: L.Map
  restaurant?: Restaurant

  constructor(
    private data: DataService,
  ) { }

  private initMap() {
    this.restaurant = this.data.selectedRestaurant

    let location = this.restaurant?.location.split(",").map(x => Number(x)) as number[]

    this.map = L.map('map', {
      center: [location[0], location[1]],
      zoom: 20
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    const marker = L.marker([location[0], location[1]])
      .bindTooltip(this.restaurant?.name!, {
        permanent: true,
        direction: "top"
      })

    tiles.addTo(this.map)
    marker.addTo(this.map)
  }

  ngAfterViewInit() {
    this.initMap()
  }
}
