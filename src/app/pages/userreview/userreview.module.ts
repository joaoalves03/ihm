import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserreviewPageRoutingModule } from './userreview-routing.module';

import { UserreviewPage } from './userreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserreviewPageRoutingModule
  ],
  declarations: [UserreviewPage]
})
export class UserreviewPageModule {}
