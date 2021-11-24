import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[{
      path: 'albumes',
      loadChildren: () => import('../../albumes/albumes.module').then( m => m.AlbumesPageModule),
      
    },
    {
      path: 'artistas',
      loadChildren: () => import('../../artistas/artistas.module').then( m => m.ArtistasPageModule),
      
    },
    {
      path: 'my-albums',
      loadChildren: () => import('../my-albums/my-albums.module').then( m => m.MyAlbumsPageModule)
    },
    {
      path: 'album/:id',
      loadChildren: () => import('../album/album.module').then( m => m.AlbumPageModule)
    },
    {
      path: 'my-songs',
      loadChildren: () => import('../my-songs/my-songs.module').then( m => m.MySongsPageModule)
    },
    {
      path: 'songs',
      loadChildren: () => import('../songs/songs.module').then( m => m.SongsPageModule)
    },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
