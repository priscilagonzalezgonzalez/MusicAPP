import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.page.html',
  styleUrls: ['./my-songs.page.scss'],
})
export class MySongsPage implements OnInit {

  tracks = [];
  userId: string;
  constructor(
    private albumesService: AlbumesService,
    public navCtrl: NavController,
    private alertController:AlertController
  ){} 

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    this.albumesService.myTracks.subscribe(songs => {
      this.tracks = songs;
    });
    this.albumesService.getTracksUser(this.userId);
  }

  async delete(trackId:any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Estás a punto de eliminar la canción, ¿deseas continuar?',
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
            var response = await this.albumesService.remTrack(trackId);
            if(response["code"] == "ok"){
              const alert = await this.alertController.create({
                header: 'Eliminado con éxito.',
                buttons: ['Aceptar']
              });
              await alert.present();
              this.albumesService.getTracksUser(this.userId);
            }
            else{
              const alert = await this.alertController.create({
                header: 'Ha ocurrido un error.',
                message: 'No se ha podido eliminar la reseña.',
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

  modify(track:any){
    localStorage.setItem('track', JSON.stringify(track));
    this.navCtrl.navigateRoot('/menu/modify-song');
  }
}
