import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserreviewPage } from './userreview.page';

const routes: Routes = [
  {
    path: '',
    component: UserreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserreviewPageRoutingModule {}
