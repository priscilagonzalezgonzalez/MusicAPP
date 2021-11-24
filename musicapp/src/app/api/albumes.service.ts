import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlbumesService {
  albums = new Subject<any[]>();
  tracks = new Subject<any[]>();

  constructor(private http: HttpClient) {
    this.getAlbums();
   }

   onLogin(correo:any, password:any): Promise<any>{
    let direccion = "/api/v1/sesiones";

    return this.http.post(direccion, {
      "correo": correo,
      "contraseña": password
    }).toPromise();
  }

  signUp(nombre:any, apellido:any, correo:any, password:any): Promise<any>{
    let direccion = "/api/v1/usuarios";

    return this.http.post(direccion,{
      "nombre": nombre,
      "apellido": apellido,
      "correo": correo,
      "contraseña": password
    }).toPromise();
  }

  getAlbums() {
    let direccion = "/api/v1/albumes";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.albums.next(data)
    })
  }

  getTracksAlbum(id:string) {
    let direccion = "/api/v1/albumes/" + id + "/tracks";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.tracks.next(data)
    })
  }

}
