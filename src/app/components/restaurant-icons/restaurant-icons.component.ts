import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common"

@Component({
  selector: 'app-restaurant-icons',
  templateUrl: './restaurant-icons.component.html',
  styleUrls: ['./restaurant-icons.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class RestaurantIconsComponent {
  @Input() restaurantAccessibility: string[] = []

  constructor() {
  }
}
