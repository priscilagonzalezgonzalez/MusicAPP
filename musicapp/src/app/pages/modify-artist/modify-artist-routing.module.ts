import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyArtistPage } from './modify-artist.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyArtistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyArtistPageRoutingModule {}
