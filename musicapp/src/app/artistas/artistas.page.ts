import { Component, OnInit } from '@angular/core';
import { ArtistasService } from '../api/artistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.page.html',
  styleUrls: ['./artistas.page.scss'],
})
export class ArtistasPage implements OnInit {
  artistas = [];

  constructor(
    private artistasService: ArtistasService, 
    private router: Router
    ) {}

  ngOnInit() {
    this.artistasService.artistas.subscribe(artistas => {this.artistas = artistas});
    this.artistasService.getArtistas()
  }

  snapURL(){
    localStorage.setItem("URL", this.router.url);
  }

}
