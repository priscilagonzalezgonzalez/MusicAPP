import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from '../api/albumes.service'
import { LoginI } from '../modelos/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  // albums = [];
  formularioLogin: FormGroup;

  constructor(private api: AlbumesService, public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) { 
    
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {

  }


  async ingresar() {
    var correo = this.formularioLogin.controls['correo'].value;
    var password = this.formularioLogin.controls['password'].value;
    this.api.onLogin(correo, password).
    subscribe(data =>{
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data))
    });
    
    if(this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return
    }
    else{
      var user = JSON.parse(localStorage.getItem('user'));
      if(String(user.code) == "ok"){
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
