import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySongsPageRoutingModule } from './my-songs-routing.module';

import { MySongsPage } from './my-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySongsPageRoutingModule
  ],
  declarations: [MySongsPage]
})
export class MySongsPageModule {}
