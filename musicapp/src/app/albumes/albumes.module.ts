import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumesPageRoutingModule } from './albumes-routing.module';

import { AlbumesPage } from './albumes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumesPageRoutingModule
  ],
  declarations: [AlbumesPage]
})
export class AlbumesPageModule {}
