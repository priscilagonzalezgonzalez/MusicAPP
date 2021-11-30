import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlbumesService {
  albums = new Subject<any[]>();
  myAlbums = new Subject<any[]>();
  favAlbums = new Subject<any[]>();
  tracksAlbum = new Subject<any[]>();
  myTracks = new Subject<any[]>();
  album = new Subject<any>();

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
    });
  }

  getAlbumsUser(id:string) {
    let direccion = " /api/v1/usuarios/" + id + "/albumes";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.myAlbums.next(data)
    });
   
  }
  getAlbumsFav(id:string) {
    let direccion = " /api/v1/usuario/" + id + "/albumes_fav";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.favAlbums.next(data)
    });
  }

  setFavAlbum(usuarioId:any, albumId:any): Promise<any>{
    let direccion = "/api/v1/usuario/" + usuarioId + "/albumes_fav";
    return this.http.post(direccion, {
      "albumId": albumId
    }).toPromise();
  }

  remFavAlbum(usuarioId:any, albumId:any): Promise<any>{
    let direccion = "/api/v1/usuario/" + usuarioId + "/albumes_fav/" + albumId;
    return this.http.delete(direccion).toPromise();
  }

  getFavAlbum(usuarioId:any, albumId:any): Promise<any>{
    let direccion = "api/v1/usuario/" + usuarioId + "/albumes_fav/" + albumId;
    return this.http.get(direccion).toPromise();
  }

  getTracksAlbum(id:string) {
    let direccion = "/api/v1/albumes/" + id + "/tracks";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.tracksAlbum.next(data)
    });
  }

  getTracksUser(id:string){
    let direccion = "/api/v1/usuario/" + id + "/tracks";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.myTracks.next(data)
      console.log(data);
    });
  }

  insertTrack(titulo:any, archivo:any, albumId:any): Promise<any>{
    let direccion = "/api/v1/tracks";

    return this.http.post(direccion, {
      "titulo": titulo,
      "archivo": archivo,
      "albumId": albumId
    }).toPromise();
  }

  getAlbum(id:string){
    let direccion = "/api/v1/albumes/" + id;
    this.http.get<any>(direccion)
    .subscribe(data=>{
      this.album.next(data)
      console.log(data);
    });
  }
}
