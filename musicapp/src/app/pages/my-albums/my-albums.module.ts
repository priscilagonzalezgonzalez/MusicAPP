import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAlbumsPageRoutingModule } from './my-albums-routing.module';

import { MyAlbumsPage } from './my-albums.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAlbumsPageRoutingModule
  ],
  declarations: [MyAlbumsPage]
})
export class MyAlbumsPageModule {}
