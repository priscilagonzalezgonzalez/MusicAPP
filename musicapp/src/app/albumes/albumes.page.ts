import { Component, OnInit } from '@angular/core';
import { AlbumesService } from '../api/albumes.service'

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.page.html',
  styleUrls: ['./albumes.page.scss'],
})
export class AlbumesPage implements OnInit {
  albums = [];

  constructor(private albumesService: AlbumesService){} 

  ngOnInit() {
    this.albumesService.albums.subscribe(albums => {
      this.albums = albums;
      console.log(this.albums)
    });/* 
    // this.albumesService.getAlbums()
    // console.log(this.albums) */
  }

}
