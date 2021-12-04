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
  albumsArtista = new Subject<any[]>();
  myTracks = new Subject<any[]>();
  favTracks = new Subject<any[]>();
  album = new Subject<any>();
  myReviews = new Subject<any[]>();

  constructor(private http: HttpClient) {
    this.getAlbums();
   }

//Usuario
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

//Albumes
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

  getAlbumsArtista(id:string) {
    let direccion = "/api/v1/artistas/" + id + "/albums";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.albumsArtista.next(data)
    });
  }

  getAlbum(id:string){
    let direccion = "/api/v1/albumes/" + id;
    this.http.get<any>(direccion)
    .subscribe(data=>{
      this.album.next(data)
      console.log(data);
    });
  }

  modifyAlbum(column:any, value:any, albumId:any, usuarioId:any): Promise<any>{
    let direccion = "/api/v1/usuarios/" + usuarioId + "/albumes/" + albumId;

    return this.http.patch(direccion, {
      "columna": column,
      "valor": value
    }).toPromise();
  }

  remAlbum(usuarioId:any, albumId:any){
    let direccion = "/api/v1/usuarios/" + usuarioId + "/albumes/" + albumId

    return this.http.delete(direccion).toPromise();
  }

//Albumes Favoritos
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

//Tracks
  getTracksAlbum(id:string) {
    let direccion = "/api/v1/albumes/" + id + "/tracks";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.tracksAlbum.next(data)
    });
  }

  getTracksFav(){

  }

  getTracksAlbumAsync(id:string): Promise<any> {
    let direccion = "/api/v1/albumes/" + id + "/tracks";
    return this.http.get(direccion).toPromise();
  }

  getTracksUser(id:string){
    let direccion = "/api/v1/usuario/" + id + "/tracks";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.myTracks.next(data)
      console.log(data);
    });
  }

  getFavTracks(usuarioId:any){
    let direccion = "/api/v1/usuario/" + usuarioId + "/tracks_fav";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.favTracks.next(data)
      console.log(data);
    });
  }

  getFavTrack(usuarioId:any, trackId:any): Promise<any>{
    let direccion = "api/v1/usuario/" + usuarioId + "/tracks_fav/" + trackId;
    return this.http.get(direccion).toPromise();
  }

  setFavTrack(usuarioId:any, trackId:any): Promise<any>{
    let direccion = "/api/v1/usuario/" + usuarioId + "/tracks_fav/" + trackId;
    return this.http.post(direccion, {
      "trackId": trackId
    }).toPromise();
  }

  remFavTrack(usuarioId:any, trackId:any): Promise<any>{
    let direccion = "api/v1/usuario/" + usuarioId + "/tracks_fav/" + trackId;
    return this.http.delete(direccion).toPromise();
  }

  insertTrack(titulo:any, archivo:any, albumId:any): Promise<any>{
    let direccion = "/api/v1/tracks";

    return this.http.post(direccion, {
      "titulo": titulo,
      "archivo": archivo,
      "albumId": albumId
    }).toPromise();
  }

  insertAlbum(titulo:any, artista:any, anio:any, imagen:any, usuarioId:any) {
    let direccion = "/api/v1/albumes";

    return this.http.post(direccion, {
      "titulo": titulo,
      "artista": artista,
      "anio": anio,
      "imagen": imagen,
      "usuarioId": usuarioId
    }).toPromise();
  }

  albumExists(titulo:any, artista:any){
    let direccion = "/api/v1/album"
    return this.http.post(direccion, {
      "titulo": titulo,
      "artista": artista
    }).toPromise();
  }

  //Reviews
  getReviews(usuarioId:any){
    let direccion = "/api/v1/usuarios/" + usuarioId + "/resenias";
    this.http.get<any[]>(direccion)
    .subscribe(data=>{
      this.myReviews.next(data)
    });
  }

  insertReview(texto: any, usuarioId: any, albumId: any): Promise<any>{
    let direccion = "/api/v1/resenias";
    return this.http.post(direccion,
      {
        "texto": texto,
        "usuarioId": usuarioId,
        "albumId": albumId
      }).toPromise();
  }

  remReview(usuarioId: any, albumId: any){
    let direccion = "/api/v1/usuarios/" + usuarioId + "/resenias/" + albumId;
    return this.http.delete(direccion).toPromise();
  }

  modifyReview(usuarioId: any, albumId: any){
    
  }
}
