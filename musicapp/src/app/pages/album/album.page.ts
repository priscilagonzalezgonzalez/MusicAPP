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
  albumId: string;
  tracks = [];
  constructor(private activatedRoute: ActivatedRoute,
    private api: AlbumesService) { }

  ngOnInit() {
    this.albumId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.tracksAlbum.subscribe(tracks => {
      this.tracks = tracks;
    })
    this.api.getTracksAlbum(this.albumId); 
  }

}
