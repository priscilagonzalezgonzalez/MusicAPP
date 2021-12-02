import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/api/artistas.service'
import { AlbumesService } from 'src/app/api/albumes.service'
 
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

  constructor(
    private activatedRoute: ActivatedRoute,
    public artistasService: ArtistasService,
    public albumsService: AlbumesService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.prevURL = localStorage.getItem("URL");

    // Consulta datos del artista
    this.artista = this.artistasService.artista.subscribe(artista => {
      this.artista = artista
      if (artista.imagen == null) {
        artista.imagen = "https://www.pngitem.com/pimgs/m/146-1460913_singers-png-free-singer-icon-png-transparent-png.png"
      }
      if (artista.biografia == null) {
        artista.biografia = "No hay biografia por el momento"
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
}
