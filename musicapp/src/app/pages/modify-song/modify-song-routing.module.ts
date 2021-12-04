import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifySongPage } from './modify-song.page';

const routes: Routes = [
  {
    path: '',
    component: ModifySongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifySongPageRoutingModule {}
