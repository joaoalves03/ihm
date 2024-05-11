import { Component } from '@angular/core';
import {NavController} from "@ionic/angular"
import {SupabaseService} from "../supabase/supabase.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {
    let a = new SupabaseService()
    a.test()
  }

  openRestaurantDetails() {
    this.navCtrl.navigateForward('/restaurant-details')
  }
}
