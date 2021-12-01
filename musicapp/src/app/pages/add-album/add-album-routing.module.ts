import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAlbumPage } from './add-album.page';

const routes: Routes = [
  {
    path: '',
    component: AddAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAlbumPageRoutingModule {}
