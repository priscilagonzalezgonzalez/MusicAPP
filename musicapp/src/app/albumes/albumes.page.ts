import { Component, OnInit } from '@angular/core';
import { AlbumesService } from '../api/albumes.service'
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.page.html',
  styleUrls: ['./albumes.page.scss'],
})
export class AlbumesPage implements OnInit {
  albums = [];

  constructor(private albumesService: AlbumesService){} 

  ngOnInit() {
    this.albumesService.albums.subscribe(albums => {
      this.albums = albums;
    });
    this.albumesService.getAlbums()
  }

  open(album:any){
    console.log(album.id);
  }

/*   async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  } */

}
