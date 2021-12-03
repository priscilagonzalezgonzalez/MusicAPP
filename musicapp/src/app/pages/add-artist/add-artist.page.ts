import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { ArtistasService } from 'src/app/api/artistas.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.page.html',
  styleUrls: ['./add-artist.page.scss'],
})
export class AddArtistPage implements OnInit {
  formularioArtista:FormGroup
  prevURL:string

  constructor(
    private artistasService: ArtistasService, 
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController
    ) {
      this.formularioArtista = this.fb.group({
        "nombre": new FormControl('', [Validators.required, Validators.maxLength(80)]),
        "biografia": new FormControl('', [Validators.required, Validators.maxLength(255)]),
        "imagen" : new FormControl('', [Validators.required, Validators.maxLength(1024)]),
      });
    }

  ngOnInit() {
    this.prevURL = localStorage.getItem("URL")
  }

  async agregar() {
    var nombre = this.formularioArtista.value.nombre;
    var biografia = this.formularioArtista.value.biografia;
    var imagen = this.formularioArtista.value.imagen;
    var usuarioId = JSON.parse(localStorage.getItem('user'))["id"];
    
    var result:any = await this.artistasService.insertArtist(nombre, biografia, imagen, usuarioId);

    if (result.code == "ok")
    {
      const alert = await this.alertController.create({
        header: 'Agregado con éxito.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.artistasService.getArtistasUsuario(usuarioId);
      this.navCtrl.navigateRoot('/menu/my-artists');
    }
    else if (result.code = "no")
    {
      const alert = await this.alertController.create({
        header: 'El artista ya existe',
        message: 'El nombre de artista ya esta en uso',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
