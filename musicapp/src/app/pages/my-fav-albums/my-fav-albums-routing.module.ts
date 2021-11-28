import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFavAlbumsPage } from './my-fav-albums.page';

const routes: Routes = [
  {
    path: '',
    component: MyFavAlbumsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFavAlbumsPageRoutingModule {}
