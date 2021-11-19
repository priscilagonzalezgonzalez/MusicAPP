import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistasPageRoutingModule } from './artistas-routing.module';

import { ArtistasPage } from './artistas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistasPageRoutingModule
  ],
  declarations: [ArtistasPage]
})
export class ArtistasPageModule {}
