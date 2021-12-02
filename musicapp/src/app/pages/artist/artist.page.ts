import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/api/artistas.service'
 
@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  id:any
  prevURL:string
  artista:any

  constructor(
    private activatedRoute: ActivatedRoute,
    public api: ArtistasService 
  ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.prevURL = localStorage.getItem("URL");
    this.artista = this.api.artista.subscribe(artista => {
      this.artista = artista
      if (artista.imagen == null) {
        artista.imagen = "https://www.pngitem.com/pimgs/m/146-1460913_singers-png-free-singer-icon-png-transparent-png.png"
      }
      if (artista.biografia == null) {
        artista.biografia = "No hay biografia por el momento"
      }
    })
    this.api.getArtistaById(this.id)
    console.log(this.artista)
  }

}
