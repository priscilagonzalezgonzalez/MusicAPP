import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
})
export class AddSongPage implements OnInit {
  formularioSong: FormGroup;
 
  constructor(private api: AlbumesService, 
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtrl: NavController) {
      this.formularioSong = this.fb.group({
        'titulo': new FormControl("", Validators.required),
        'archivo': new FormControl("")
      });
    } 

  ngOnInit() {
  }

  async agregar(){
    var titulo = this.formularioSong.controls['titulo'].value;
    var archivo = this.formularioSong.controls['archivo'].value;
    
    if(this.formularioSong.invalid){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else{
      var albumId = JSON.parse(localStorage.getItem('albumId'));
      var response = await this.api.insertTrack(titulo, archivo, albumId);
      var code = response["code"];
      console.log(code);
      if(code == "ok"){
        const alert = await this.alertController.create({
          header: 'Agregado con éxito.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
        localStorage.removeItem('albumId');
        this.navCtrl.navigateRoot('/menu/album/' + albumId);
      }else if(code == "no"){
        const alert = await this.alertController.create({
          header: 'La canción ya existe.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      }else{
        const alert = await this.alertController.create({
          header: 'Ocurrió un erorr al agregar.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      }
    }
  }

  cancelar(){
    var albumId = JSON.parse(localStorage.getItem('albumId'));
    localStorage.removeItem('albumId');
    this.navCtrl.navigateRoot('/menu/album/' + albumId);
  }

}
