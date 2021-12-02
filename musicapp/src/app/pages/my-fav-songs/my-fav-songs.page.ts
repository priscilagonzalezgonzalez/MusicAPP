import { Component, OnInit } from '@angular/core';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-my-fav-songs',
  templateUrl: './my-fav-songs.page.html',
  styleUrls: ['./my-fav-songs.page.scss'],
})
export class MyFavSongsPage implements OnInit {
  tracks = [];
  userId: string;

  constructor(private albumesService: AlbumesService) { }

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    this.albumesService.favTracks.subscribe(myTracks => {
      this.tracks = myTracks;
    });
    
    this.albumesService.getFavTracks(this.userId)
  }

}
