import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../objects/restaurant"

@Component({
  selector: 'app-restaurant-card-simple',
  templateUrl: './restaurant-card-simple.component.html',
  styleUrls: ['./restaurant-card-simple.component.scss'],
})
export class RestaurantCardSimpleComponent  implements OnInit {
  @Input() restaurant?: Restaurant

  constructor() { }

  ngOnInit() {}

}
