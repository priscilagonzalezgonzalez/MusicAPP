import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistasPage } from './artistas.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistasPageRoutingModule {}
