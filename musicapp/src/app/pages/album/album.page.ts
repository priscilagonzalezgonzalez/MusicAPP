import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  userId: string;
  albumId: string;
  userOwns = 0;
  tracks = [];
  album:any;

  constructor(private activatedRoute: ActivatedRoute,
    private api: AlbumesService) { }

  async ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    this.albumId = this.activatedRoute.snapshot.paramMap.get('id');
    this.album = this.api.album.subscribe(album =>{
      this.album = album;
      if(this.userId == (this.album["usuarioId"]).toString()){
        this.userOwns = 1;
      }
    });
    this.api.tracksAlbum.subscribe(tracks => {
      this.tracks = tracks;
    });
    this.api.getTracksAlbum(this.albumId); 
    this.api.getAlbum(this.albumId);
  }

}
