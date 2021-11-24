import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from '../api/albumes.service'

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
    var temp_data: any;
    var user: any;
    var correo = this.formularioLogin.controls['correo'].value;
    var password = this.formularioLogin.controls['password'].value;
    user = await this.api.onLogin(correo, password);
    localStorage.setItem('user', JSON.stringify(user));
    
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
