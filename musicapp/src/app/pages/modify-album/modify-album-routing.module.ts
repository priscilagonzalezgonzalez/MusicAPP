import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyAlbumPage } from './modify-album.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyAlbumPageRoutingModule {}
