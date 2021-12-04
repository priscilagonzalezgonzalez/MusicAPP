import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';
import { ArtistasService } from 'src/app/api/artistas.service';

@Component({
  selector: 'app-modify-artist',
  templateUrl: './modify-artist.page.html',
  styleUrls: ['./modify-artist.page.scss'],
})
export class ModifyArtistPage implements OnInit {
  formularioArtista: FormGroup;
  artistId:any;
  //Current info
  nombre:any;
  biografia:any;
  imagen:any;

  constructor(private api: AlbumesService, 
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtrl: NavController, 
    private artistas: ArtistasService) {
      this.artistId = JSON.parse(localStorage.getItem('artistId'));
      var artist = JSON.parse(localStorage.getItem('artist'));
      this.nombre = artist["nombre"];
      this.biografia = artist["biografia"];
      this.imagen = artist["imagen"];

      this.formularioArtista = this.fb.group({
        'nombre': new FormControl(this.nombre, [Validators.required, Validators.maxLength(80)]),
        'biografia': new FormControl(this.biografia,  [Validators.required, Validators.maxLength(255)]),
        'imagen': new FormControl(this.imagen, [Validators.required, Validators.maxLength(1024)])
      });
      this.formularioArtista.controls['nombre'].setValue(this.nombre);
      this.formularioArtista.controls['biografia'].setValue(this.biografia);
      this.formularioArtista.controls['imagen'].setValue(this.imagen);
    } 

  ngOnInit() {

  }

  async aceptar(){
    var ok = ["ok", "ok", "ok"];
    var nombre = this.formularioArtista.controls['nombre'].value;
    var biografia = this.formularioArtista.controls['biografia'].value;
    var imagen = this.formularioArtista.controls['imagen'].value;
    if(this.formularioArtista.invalid){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Verfica que los datos ingresados sean correctos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else{
      if(this.nombre != nombre){
        var yaExiste = await this.artistas.existeArtista(nombre);
        var code = yaExiste["code"];
        if(code == "ok"){
          const alert = await this.alertController.create({
            header: 'Artista ya existe',
            message: 'Estás intentando crear un artista que ya existe.',
            buttons: ['Aceptar']
          });
    
          await alert.present();
          return
        }
        else{
          var response = await this.artistas.modifyArtista("nombre", nombre, this.artistId);
          var code = response["code"];
          if(code != "ok"){
            ok[0] = "no";
          }
        }
      }
      if(this.biografia != biografia){
        var response = await this.artistas.modifyArtista("biografia", biografia, this.artistId);
        var code = response["code"];
        console.log(code);
        if(code != "ok"){
          ok[1] = "no";
        }
      }
      if(this.imagen != imagen){
        var response = await this.artistas.modifyArtista("imagen", imagen, this.artistId);
        var code = response["code"];
        if(code != "ok"){
          ok[2] = "no";
        }
      }

      ok.forEach(async code => {
        console.log(code)
        if(code != "ok"){
          const alert = await this.alertController.create({
            header: 'Ha ocurrido un error',
            message: 'No se ha podido modificar al álbum correctamente.',
            buttons: ['Aceptar']
          });
    
          await alert.present();
          console.log(ok)
          return
        }
      });

      const alert = await this.alertController.create({
        header: 'Modificado con éxito.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      localStorage.removeItem('artistaId');
      this.navCtrl.navigateRoot('/menu/artist/' + this.artistId);
    }
  }

  cancelar(){
    localStorage.removeItem('artistaId');
    this.navCtrl.navigateRoot('/menu/artist/' + this.artistId);
  }

}
