import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "../../objects/restaurant"

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  loading = true
  restaurants: Restaurant[] = []

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.route.queryParamMap.subscribe(async params => {
      const query = params.get('query')

      if (query === null) {
        this.restaurants = []
        return
      }

      this.restaurants = await this.data.findRestaurants(query)

      this.loading = false
    })
  }

  ngOnInit() {

  }




}
