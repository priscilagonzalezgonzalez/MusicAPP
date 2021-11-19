import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AlbumesService } from './api/albumes.service';
import { PopoverComponent } from './popover/popover.component';
import { ArtistasService } from './api/artistas.service';

@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AlbumesService,
    ArtistasService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
