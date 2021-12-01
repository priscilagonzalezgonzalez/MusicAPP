import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlbumesService } from 'src/app/api/albumes.service';
import { ArtistasService } from 'src/app/api/artistas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.page.html',
  styleUrls: ['./add-album.page.scss'],
})
export class AddAlbumPage implements OnInit {
  formularioAlbum:FormGroup
  prevURL:string;

  constructor(private albums: AlbumesService, private artistas: ArtistasService, public fb: FormBuilder,public alertController: AlertController) {
    this.formularioAlbum = this.fb.group({
      "titulo": new FormControl('', Validators.required),
      "artista": new FormControl('', Validators.required),
      "anio": new FormControl('', [Validators.required, Validators.min(0), Validators.max(2021)]),
      "imagen" : new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.prevURL = localStorage.getItem("URL")
  }

  async agregar() {
    var titulo = this.formularioAlbum.value.titulo;
    var artista = this.formularioAlbum.value.artista;
    var anio = this.formularioAlbum.value.anio;
    var imagen = this.formularioAlbum.value.imagen;
    var usuarioId = JSON.parse(localStorage.getItem('user'))["id"];
    
    var respuesta:any
    var data = await this.artistas.getArtista(artista)
    
    if (data.usuarioId != usuarioId)
    {
      const alert = await this.alertController.create({
        header: 'Artista no valido',
        message: 'Este artista no te pertence',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else{
      respuesta = await this.albums.insertAlbum(titulo, artista, anio, imagen, usuarioId);

      if (respuesta.code == "no")
      {
        const alert = await this.alertController.create({
          header: 'El álbum ya existe ',
          message: 'Este álbum ya existe',
          buttons: ['Aceptar']
        });
    
        await alert.present();
        return
      }
    }
  }

}
