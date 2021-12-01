import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyAlbumPageRoutingModule } from './modify-album-routing.module';

import { ModifyAlbumPage } from './modify-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifyAlbumPageRoutingModule
  ],
  declarations: [ModifyAlbumPage]
})
export class ModifyAlbumPageModule {}
