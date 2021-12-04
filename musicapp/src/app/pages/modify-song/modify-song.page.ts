import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-modify-song',
  templateUrl: './modify-song.page.html',
  styleUrls: ['./modify-song.page.scss'],
})
export class ModifySongPage implements OnInit {
  formularioTrack: FormGroup;
  track:any

  constructor(
    private api: AlbumesService, 
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtrl: NavController
  )
  {
    this.formularioTrack = this.fb.group({
      'titulo': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'archivo': new FormControl("", Validators.maxLength(1024)),
    });
  }

  ngOnInit() {
    this.track = JSON.parse(localStorage.getItem('track'));
    localStorage.removeItem('track');
    this.formularioTrack.controls['titulo'].setValue(this.track.titulo);
    this.formularioTrack.controls['archivo'].setValue(this.track.archivo);
  }

  async aceptar(){
    var titulo = this.formularioTrack.value.titulo;
    var archivo = this.formularioTrack.value.archivo;
    
    var exito = false
    var sin_cambios = true

    // Modificación del titulo
    if(this.track.titulo != titulo)
    {
      sin_cambios = false
      var result = await this.api.modifyTrack("titulo", titulo, this.track.id)
      if(result.code == "ok"){
        exito = true
      }
    }

    // Modificación del archivo
    if(this.track.archivo != archivo)
    {
      sin_cambios = false
      var result = await this.api.modifyTrack("archivo", archivo, this.track.id)
      if(result.code == "ok"){
        exito = true
      }
    }

    // Muestra de resultado
    if(exito)
    {
      const alert = await this.alertController.create({
        header: 'Modificado con éxito.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/menu/my-songs');
    }
    else if(sin_cambios)
    {
      this.navCtrl.navigateRoot('/menu/my-songs');
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Ha ocurrido un error',
        message: 'No se ha podido modificar la canción correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  cancelar() {
    this.navCtrl.navigateRoot('/menu/my-songs');
  }

}
