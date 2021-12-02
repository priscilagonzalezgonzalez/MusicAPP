import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';
import { ArtistasService } from 'src/app/api/artistas.service';

@Component({
  selector: 'app-modify-album',
  templateUrl: './modify-album.page.html',
  styleUrls: ['./modify-album.page.scss'],
})
export class ModifyAlbumPage implements OnInit {
  formularioAlbum: FormGroup;
  albumTitulo:string;
  albumArtista:string;
  albumAnio:string;
  albumImagen:string;
  albumId: string;
  usuarioId: string;
 
  constructor(private api: AlbumesService, 
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtrl: NavController, 
    private artistas: ArtistasService) {
      var usuario = JSON.parse(localStorage.getItem('user'));
      this.usuarioId = usuario["id"];
      this.albumId = JSON.parse(localStorage.getItem('albumId'));
      var album = JSON.parse(localStorage.getItem('album'));
      this.albumTitulo = album["titulo"];
      this.albumArtista = album["artistaNombre"];
      this.albumImagen = album["imagen"];
      this.albumAnio = album["anio"];

      this.formularioAlbum = this.fb.group({
        'titulo': new FormControl(this.albumTitulo, Validators.required),
        'nombreArtista': new FormControl(this.albumArtista, Validators.required),
        'imagen': new FormControl(this.albumImagen, Validators.required),
        'anio': new FormControl(this.albumAnio,Validators.required)
      });
      this.formularioAlbum.controls['titulo'].setValue(this.albumTitulo);
      this.formularioAlbum.controls['nombreArtista'].setValue(this.albumArtista);
      this.formularioAlbum.controls['imagen'].setValue(this.albumImagen);
      this.formularioAlbum.controls['anio'].setValue(this.albumAnio); 
    } 

  ngOnInit() {
  }

  async aceptar(){
    var titulo = this.formularioAlbum.controls['titulo'].value;
    var artista = this.formularioAlbum.controls['nombreArtista'].value;
    var imagen = this.formularioAlbum.controls['imagen'].value;
    var anio = this.formularioAlbum.controls['anio'].value;
    var data = await this.artistas.getArtista(artista);
    var ok = ["ok", "ok", "ok", "ok"];
    //Modificar titulo
    if(this.formularioAlbum.invalid){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else{
      if(this.albumTitulo != titulo){
        var response = await this.api.modifyAlbum("titulo", titulo, this.albumId, this.usuarioId);
        var code = response["code"];
        console.log("titulo: ", code);
        if(code != "ok"){
          ok[0] = "no";
        }
      }
    
      if(this.albumArtista != artista){
        if(data.usuarioId != this.usuarioId){
          const alert = await this.alertController.create({
            header: 'Artista no valido',
            message: 'Este artista no te pertence',
            buttons: ['Aceptar']
          });
    
          await alert.present();
          return
        }
        else{
          var response = await this.api.modifyAlbum("artistaId", data.id, this.albumId, this.usuarioId);
          var code = response["code"];
          console.log("arista: ", code);
          if(code != "ok"){
            ok[1] = "no";
          }
        }
      }
      /* 

      if(this.albumImagen != imagen){
        var response = await this.api.modifyAlbum("imagen", imagen, this.albumId, this.usuarioId);
        var code = response["code"];
        console.log("imagen: ", code);
        if(code != "ok"){
          ok[2] = "no";
        }
      }

      if(this.albumAnio != anio){
        var response = await this.api.modifyAlbum("anio", anio, this.albumId, this.usuarioId);
        var code = response["code"];
        console.log("anio: ", code);
        if(code != "ok"){
          ok[3] = "no";
        }
      }

      for(code in ok){
        if(code != "ok"){
          const alert = await this.alertController.create({
            header: 'Ha ocurrido un error',
            message: 'No se ha podido modificar al álbum correctamente.',
            buttons: ['Aceptar']
          });
    
          await alert.present();
          return
        }
      } */
      const alert = await this.alertController.create({
        header: 'Modificado con éxito.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      localStorage.removeItem('albumId');
      this.navCtrl.navigateRoot('/menu/album/' + this.albumId);
    
    }
  }

}
