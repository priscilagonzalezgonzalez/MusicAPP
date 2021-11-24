import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  paginas = [
    {
      titulo: 'Inicio',
      url: '/menu/albumes',
      icono: 'home'
    },
    {
      titulo: 'Perfil',
      url: '',
      icono: 'person-sharp'
    },
    {
      titulo: 'Mis álbumes',
      url: '/menu/my-albums',
      icono: 'headset'
    },
    {
      titulo: 'Mis álbumes favoritos',
      url: '',
      icono: 'heart'
    },
    {
      titulo: 'Mis canciones',
      url: '/menu/my-songs',
      icono: 'disc-sharp'
    },
    {
      titulo: 'Mis canciones favoritas',
      url: '',
      icono: 'heart-circle'
    },
    {
      titulo: "Artistas",
      url: "/menu/artistas",
      icono: 'mic'
    }

  ]
  constructor(public alertController: AlertController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  salir(){
    localStorage.removeItem('ingresado');
    localStorage.removeItem('user');
    this.navCtrl.navigateRoot('login');
  }

}
