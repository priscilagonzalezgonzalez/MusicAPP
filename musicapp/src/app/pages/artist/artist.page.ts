import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/api/artistas.service'
import { AlbumesService } from 'src/app/api/albumes.service'
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  id:any
  prevURL:string
  artista:any
  albums:any[]
  numAlbums:any
  userOwns = 0;
  userId:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public artistasService: ArtistasService,
    public albumsService: AlbumesService,
    public navCtrl: NavController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.prevURL = localStorage.getItem("URL");
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    // Consulta datos del artista
    this.artista = this.artistasService.artista.subscribe(artista => {
      this.artista = artista
      if (artista.imagen == null) {
        artista.imagen = "https://www.pngitem.com/pimgs/m/146-1460913_singers-png-free-singer-icon-png-transparent-png.png"
      }
      if (artista.biografia == null) {
        artista.biografia = "No hay biografia por el momento"
      }
      console.log(this.artista["usuarioId"]);
      if(this.userId == (this.artista["usuarioId"]).toString()){
        this.userOwns = 1;
      }
    })
    this.artistasService.getArtistaById(this.id)

    // Consulta albumes artista
    this.albumsService.albumsArtista.subscribe(albums => {
      this.albums = albums
      this.numAlbums = albums.length
    })
    this.albumsService.getAlbumsArtista(this.id)
  }

  snapURL(){
    localStorage.setItem("URL", this.router.url);
  }

  modify(){
    localStorage.setItem('artist', JSON.stringify(this.artista));
    localStorage.setItem('artistId', this.id);
    this.navCtrl.navigateRoot('/menu/modify-artist');
  }
}
