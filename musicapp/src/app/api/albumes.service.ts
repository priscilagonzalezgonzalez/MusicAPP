import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginI } from '../modelos/login.interface';
import { ResponseI } from '../modelos/response.interface';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlbumesService {
  albums = new Subject<any[]>();

  constructor(private http: HttpClient) {
    this.getAlbums();
   }

  onLogin(correo:any, password:any){
    let direccion = "/api/v1/sesiones";

    return this.http.post(direccion, {
      "correo": correo,
      "contraseña": password
    });
  }

  getAlbums() {
    let direccion = "/api/v1/albumes";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.albums.next(data)
    })
  }
}
