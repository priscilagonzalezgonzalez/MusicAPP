import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';

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
    public navCtrl: NavController) {
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
        if(code == "ok"){
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
    
      if(this.albumArtista != artista){
        console.log("OK")
      }
      if(this.albumImagen != imagen){
        console.log("OK")
      }
      if(this.albumAnio != anio){
        console.log("OK")
      }
    }


}
