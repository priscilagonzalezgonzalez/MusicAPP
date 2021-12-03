import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';
import { ArtistasService } from 'src/app/api/artistas.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  
  /* usuarioId: any;
  albumId: any;

  formularioRev: FormGroup;
 
  constructor(private api: AlbumesService, 
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtrl: NavController) {
      this.formularioRev = new FormGroup({
        "texto": new FormControl("", Validators.required)
     });
    } */
    formularioAlbum:FormGroup
    prevURL:string;
  
    constructor(
      private albums: AlbumesService, 
      private artistas: ArtistasService, 
      public fb: FormBuilder,
      public alertController: AlertController,
      public navCtrl: NavController
      ) {
      this.formularioAlbum = this.fb.group({
        "texto": new FormControl('', Validators.required),
      });
    }

  ngOnInit() {
  }

  async agregar() {
    if(this.formularioAlbum.invalid){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }else{
      var texto = this.formularioAlbum.value.texto;
      var usuarioId = JSON.parse(localStorage.getItem('user'))["id"];
      var albumId = JSON.parse(localStorage.getItem('albumId'));
    
      var response = await this.albums.insertReview(texto, usuarioId, albumId);
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
          header: 'Ya has hecho una reseña de este álbum.',
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
