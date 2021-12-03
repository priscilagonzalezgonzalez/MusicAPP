import { Component, OnInit } from '@angular/core';
import { ArtistasService } from '../../api/artistas.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-artists',
  templateUrl: './my-artists.page.html',
  styleUrls: ['./my-artists.page.scss'],
})
export class MyArtistsPage implements OnInit {
  artistas = [];
  usuarioId:any

  constructor(
    private artistasService: ArtistasService, 
    private router: Router,
    public navCtrl: NavController
    ) {}

  ngOnInit() {
    this.usuarioId = JSON.parse(localStorage.getItem('user'))["id"];
    this.artistasService.artistasUsuario.subscribe(artistas => {this.artistas = artistas});
    this.artistasService.getArtistaUsuario(this.usuarioId);
  }

  snapURL(){
    localStorage.setItem("URL", this.router.url);
    console.log("snap")
  }

  modify(){
    this.navCtrl.navigateRoot('/menu/albumes');
  }

  delete(id:string){
    console.log("Eliminar artista con id:" + id)
  }
}
