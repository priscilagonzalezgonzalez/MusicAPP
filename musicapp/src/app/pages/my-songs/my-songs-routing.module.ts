import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySongsPage } from './my-songs.page';

const routes: Routes = [
  {
    path: '',
    component: MySongsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySongsPageRoutingModule {}
