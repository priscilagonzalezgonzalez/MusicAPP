import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
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

  constructor(private api: AlbumesService, public fb: FormBuilder) { 
    
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {

  }

  ingresar() {
    var f = this.formularioLogin.value;
    var correo = this.formularioLogin.controls['correo'].value
    var password = this.formularioLogin.controls['password'].value

    this.api.onLogin(correo, password).
    subscribe(data =>{
      console.log(data);
    });
    
/*     this.api.getAlbums().
    subscribe(data =>{
      this.albums = data;
      console.log(this.albums);
    }) */

  }
}
