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
      path: 'add-album',
      loadChildren: () => import('../add-album/add-album.module').then( m => m.AddAlbumPageModule)
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
      path: 'add-song',
      loadChildren: () => import('../add-song/add-song.module').then( m => m.AddSongPageModule)
    },
    {
      path: 'modify-album',
      loadChildren: () => import('../modify-album/modify-album.module').then( m => m.ModifyAlbumPageModule)
    },  
    {
      path: 'my-songs',
      loadChildren: () => import('../my-songs/my-songs.module').then( m => m.MySongsPageModule)
    },
    {
      path: 'songs',
      loadChildren: () => import('../songs/songs.module').then( m => m.SongsPageModule)
    },
    {
      path: 'my-fav-albums',
      loadChildren: () => import('../my-fav-albums/my-fav-albums.module').then( m => m.MyFavAlbumsPageModule)
    },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
