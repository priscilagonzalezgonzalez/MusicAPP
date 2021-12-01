import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumesService } from '../api/albumes.service'
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.page.html',
  styleUrls: ['./albumes.page.scss'],
})
export class AlbumesPage implements OnInit {
  albums = [];
  URL: any;

  constructor(private albumesService: AlbumesService, 
    private router: Router){} 

  ngOnInit() {
    this.albumesService.albums.subscribe(albums => {
      this.albums = albums;
    });
    this.albumesService.getAlbums()
  }

  snapURL(){
    this.URL = this.router.url;
    localStorage.setItem("URL", this.URL);
    console.log(this.URL);
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
