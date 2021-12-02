import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyReviewsPage } from './my-reviews.page';

const routes: Routes = [
  {
    path: '',
    component: MyReviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReviewsPageRoutingModule {}
