import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyArtistPageRoutingModule } from './modify-artist-routing.module';

import { ModifyArtistPage } from './modify-artist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifyArtistPageRoutingModule
  ],
  declarations: [ModifyArtistPage]
})
export class ModifyArtistPageModule {}
