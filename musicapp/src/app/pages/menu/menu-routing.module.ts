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
      path: 'my-fav-songs',
      loadChildren: () => import('../my-fav-songs/my-fav-songs.module').then( m => m.MyFavSongsPageModule)
    },
    {
      path: 'my-fav-albums',
      loadChildren: () => import('../my-fav-albums/my-fav-albums.module').then( m => m.MyFavAlbumsPageModule)
    },
    {
      path: 'my-reviews',
      loadChildren: () => import('../my-reviews/my-reviews.module').then( m => m.MyReviewsPageModule)
    },
    {
      path: 'add-review',
      loadChildren: () => import('../add-review/add-review.module').then( m => m.AddReviewPageModule)
    },
    {
      path: 'artist/:id',
      loadChildren: () => import('../artist/artist.module').then( m => m.ArtistPageModule)
    },
    {
      path: 'my-artists',
      loadChildren: () => import('../my-artists/my-artists.module').then( m => m.MyArtistsPageModule)
    },
    {
      path: 'add-artist',
      loadChildren: () => import('../add-artist/add-artist.module').then( m => m.AddArtistPageModule)
    },
    {
      path: 'modify-artist',
      loadChildren: () => import('../modify-artist/modify-artist.module').then( m => m.ModifyArtistPageModule)
    },
    {
      path: 'modify-song',
      loadChildren: () => import('../modify-song/modify-song.module').then( m => m.ModifySongPageModule)
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
