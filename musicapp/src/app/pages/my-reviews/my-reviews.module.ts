import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReviewsPageRoutingModule } from './my-reviews-routing.module';

import { MyReviewsPage } from './my-reviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReviewsPageRoutingModule
  ],
  declarations: [MyReviewsPage]
})
export class MyReviewsPageModule {}
