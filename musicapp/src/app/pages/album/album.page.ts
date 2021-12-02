import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  favorite: any;
  favoriteSong = [];
  prevURL:string; 

  constructor(private activatedRoute: ActivatedRoute,
    private api: AlbumesService, public navCtrl: NavController) { }

  async ngOnInit() {
    this.prevURL = localStorage.getItem("URL");
    // localStorage.removeItem("URL");

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

    var tracks = await this.api.getTracksAlbumAsync(this.albumId);
    tracks.forEach(async element => {
      var code = await this.api.getFavTrack(this.userId, element["id"]);
      console.log(code);
      this.favoriteSong.push({"code": code["code"], "id": element["id"]});
    });
    

    var is_fav = await this.api.getFavAlbum(this.userId, this.albumId);
    console.log(is_fav["code"]);
    this.favorite = (is_fav["code"]);
    /* if(is_fav["code"] == "ok"){
      this.favorite = "ok";
    } */

    this.api.getAlbum(this.albumId);
    this.api.getTracksAlbum(this.albumId); 

    console.log(tracks);
    console.log(this.favoriteSong);
  }

  add_song(){
    localStorage.setItem('album', JSON.stringify(this.album));
    localStorage.setItem('albumId', this.albumId);
    this.navCtrl.navigateRoot('/menu/add-song');
  }

  modify(){
    localStorage.setItem('album', JSON.stringify(this.album));
    localStorage.setItem('albumId', this.albumId);
    this.navCtrl.navigateRoot('/menu/modify-album');
  }

  async add_fav(){
    var is_fav = await this.api.setFavAlbum(this.userId, this.albumId);
    console.log(is_fav["code"]);
    this.favorite = (is_fav["code"]);
  }

  async rem_fav(){
    var is_fav = await this.api.remFavAlbum(this.userId, this.albumId);
    console.log(is_fav["code"]);
    if(is_fav["code"] == "ok"){
      this.favorite = "no";
      this.api.getAlbumsFav(this.userId);
    }
  }

  async add_fav_song(index){
    var trackId = this.favoriteSong[index].id;
    console.log(trackId);
    var is_fav = await this.api.setFavTrack(this.userId, trackId);
    this.favoriteSong[index].code = is_fav["code"];
    console.log(this.favoriteSong[index].code);
  }

  async rem_fav_song(index){
    var trackId = this.favoriteSong[index].id;
    var is_fav = await this.api.remFavTrack(this.userId, trackId);
    console.log(is_fav["code"]);
    if(is_fav["code"] == "ok"){
      this.favoriteSong[index].code = "no";
      //Actualizar vista de tracks favoritos
    }
  }

}
