import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/api/artistas.service'
import { AlbumesService } from 'src/app/api/albumes.service'
import { AlertController, NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  id:any
  prevURL:string
  artista:any
  albums:any[]
  numAlbums:any
  userOwns = 0;
  userId:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public artistasService: ArtistasService,
    public albumsService: AlbumesService,
    public navCtrl: NavController,
    private router: Router,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.prevURL = localStorage.getItem("URL");
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    // Consulta datos del artista
    this.artista = this.artistasService.artista.subscribe(artista => {
      this.artista = artista
      if (artista.imagen == null) {
        artista.imagen = "https://www.pngitem.com/pimgs/m/146-1460913_singers-png-free-singer-icon-png-transparent-png.png"
      }
      if (artista.biografia == null) {
        artista.biografia = "No hay biografia por el momento"
      }
      console.log(this.artista["usuarioId"]);
      if(this.userId == (this.artista["usuarioId"]).toString()){
        this.userOwns = 1;
      }
    })
    this.artistasService.getArtistaById(this.id)

    // Consulta albumes artista
    this.albumsService.albumsArtista.subscribe(albums => {
      this.albums = albums
      this.numAlbums = albums.length
    })
    this.albumsService.getAlbumsArtista(this.id)
  }

  snapURL(){
    localStorage.setItem("URL", this.router.url);
  }

  modify(){
    localStorage.setItem('artist', JSON.stringify(this.artista));
    localStorage.setItem('artistId', this.id);
    this.navCtrl.navigateRoot('/menu/modify-artist');
  }

  async delete(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Estás a punto de eliminar el artista, ¿deseas continuar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            var response = await this.artistasService.remArtista(this.userId, this.id);
            if(response["code"] == "ok"){
              const alert = await this.alertController.create({
                header: 'Eliminado con éxito.',
                buttons: ['Aceptar']
              });
              await alert.present();
              this.artistasService.getArtistasUsuario(this.userId);

              this.navCtrl.navigateRoot("/menu/my-artists");
            }
            else{
              const alert = await this.alertController.create({
                header: 'Ha ocurrido un error.',
                message: 'No se ha podido eliminar el álbum.',
                buttons: ['Aceptar']
              });
              await alert.present();
              return
            }
            
          }
        }]
    });

    await alert.present();
  }
}
