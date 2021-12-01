import { Component, OnInit } from '@angular/core';
import { AlbumesService } from 'src/app/api/albumes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.page.html',
  styleUrls: ['./my-albums.page.scss'],
})
export class MyAlbumsPage implements OnInit {
  albums = [];
  userId: string;
  URL: string;

  constructor(private activatedRoute: ActivatedRoute,
    private albumesService: AlbumesService,
    private router: Router){} 

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    console.log(this.userId);
    this.albumesService.myAlbums.subscribe(myAlbums => {
      this.albums = myAlbums;
    });
    
    this.albumesService.getAlbumsUser(this.userId)
  }

  snapURL(){
    this.URL = this.router.url;
    localStorage.setItem("URL", this.URL);
    console.log(this.URL);
  }

}
