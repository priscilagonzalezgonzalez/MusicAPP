import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArtistPageRoutingModule } from './add-artist-routing.module';

import { AddArtistPage } from './add-artist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddArtistPageRoutingModule
  ],
  declarations: [AddArtistPage]
})
export class AddArtistPageModule {}
