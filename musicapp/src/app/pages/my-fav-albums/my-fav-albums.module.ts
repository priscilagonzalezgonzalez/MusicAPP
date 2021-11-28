import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFavAlbumsPageRoutingModule } from './my-fav-albums-routing.module';

import { MyFavAlbumsPage } from './my-fav-albums.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFavAlbumsPageRoutingModule
  ],
  declarations: [MyFavAlbumsPage]
})
export class MyFavAlbumsPageModule {}
