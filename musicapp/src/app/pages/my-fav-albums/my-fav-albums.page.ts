import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-my-fav-albums',
  templateUrl: './my-fav-albums.page.html',
  styleUrls: ['./my-fav-albums.page.scss'],
})
export class MyFavAlbumsPage implements OnInit {
  albums = [];
  userId: string;
  
  constructor(private activatedRoute: ActivatedRoute,
    private albumesService: AlbumesService){} 

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    console.log(this.userId);
    this.albumesService.favAlbums.subscribe(myAlbums => {
      this.albums = myAlbums;
    });
    
    this.albumesService.getAlbumsFav(this.userId)
  }

}
