import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.page.html',
  styleUrls: ['./my-reviews.page.scss'],
})
export class MyReviewsPage implements OnInit {

  myReviews = [];
  userId:any;

  constructor(private albumesService: AlbumesService,
    private alertController: AlertController) { }

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    console.log(this.userId);
    this.albumesService.myReviews.subscribe(myReviews => {
      this.myReviews = myReviews;
    });
    
    this.albumesService.getReviews(this.userId)
  }

  async delete(albumId:any){
    console.log(albumId)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Estás a punto de eliminar la reseña, ¿deseas continuar?',
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
            var response = await this.albumesService.remReview(this.userId, albumId);
            if(response["code"] == "ok"){
              const alert = await this.alertController.create({
                header: 'Eliminado con éxito.',
                buttons: ['Aceptar']
              });
              await alert.present();
              this.albumesService.getReviews(this.userId);
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

  cancelar(){
    return
  }

}
