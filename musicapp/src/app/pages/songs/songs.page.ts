import { Component, OnInit } from '@angular/core';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  tracks = [];
  userId: string;
  constructor(private albumesService: AlbumesService){} 

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    this.albumesService.myTracks.subscribe(songs => {
      this.tracks = songs;
    });
    this.albumesService.getTracksUser(this.userId);
  }

}
