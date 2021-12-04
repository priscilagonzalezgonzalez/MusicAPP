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
    /* {
      titulo: 'Perfil',
      url: '',
      icono: 'person-sharp'
    }, */
    {
      titulo: 'Mis álbumes',
      url: '/menu/my-albums',
      icono: 'headset'
    },
    {
      titulo: 'Mis álbumes favoritos',
      url: '/menu/my-fav-albums',
      icono: 'heart'
    },
    {
      titulo: 'Mis canciones',
      url: '/menu/my-songs',
      icono: 'disc-sharp'
    },
    {
      titulo: 'Mis canciones favoritas',
      url: '/menu/my-fav-songs',
      icono: 'heart-circle'
    },
    {
      titulo: "Artistas",
      url: "/menu/artistas",
      icono: 'mic'
    },
    {
      titulo: "Mis reseñas",
      url: "/menu/my-reviews",
      icono: 'eye-outline'
    },
    {
      titulo: "Mis artistas",
      url: "/menu/my-artists",
      icono: 'accessibility'
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
