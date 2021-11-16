import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAlbumsPage } from './my-albums.page';

const routes: Routes = [
  {
    path: '',
    component: MyAlbumsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAlbumsPageRoutingModule {}
