import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifySongPageRoutingModule } from './modify-song-routing.module';

import { ModifySongPage } from './modify-song.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifySongPageRoutingModule
  ],
  declarations: [ModifySongPage]
})
export class ModifySongPageModule {}
