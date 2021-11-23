import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from '../api/albumes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  formularioRegistro: FormGroup;

  constructor(private api: AlbumesService, public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var nombre = this.formularioRegistro.controls['nombre'].value;;
    var apellido = this.formularioRegistro.controls['apellido'].value; 
    var correo = this.formularioRegistro.controls['correo'].value;
    var password = this.formularioRegistro.controls['password'].value;
    var confirmPass = this.formularioRegistro.controls['confirmPassword'].value;

    var user = await this.api.signUp(nombre, apellido, correo, password);
    localStorage.setItem('user', JSON.stringify(user));
    
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else if(password != confirmPass){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else{
      var user_store = JSON.parse(localStorage.getItem('user'));
      var code = user_store["code"];
      if(code == "ok"){
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('/menu/albumes');
      }else{
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos ingresados son incorrectos.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      }
    }
  }
}
