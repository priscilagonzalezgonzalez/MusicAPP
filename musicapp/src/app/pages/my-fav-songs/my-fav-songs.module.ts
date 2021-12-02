import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFavSongsPageRoutingModule } from './my-fav-songs-routing.module';

import { MyFavSongsPage } from './my-fav-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFavSongsPageRoutingModule
  ],
  declarations: [MyFavSongsPage]
})
export class MyFavSongsPageModule {}
