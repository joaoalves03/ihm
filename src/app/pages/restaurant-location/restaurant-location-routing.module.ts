import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantLocationPage } from './restaurant-location.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantLocationPageRoutingModule {}
