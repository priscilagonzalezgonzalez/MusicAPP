import { Component, OnInit } from '@angular/core';
import { ArtistasService } from '../api/artistas.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.page.html',
  styleUrls: ['./artistas.page.scss'],
})
export class ArtistasPage implements OnInit {
  artistas = [];

  constructor(private artistasService: ArtistasService) { 

  }

  ngOnInit() {
    this.artistasService.artistas.subscribe(artistas => {this.artistas = artistas});
    this.artistasService.getArtistas()
  }
}
