import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistasService {
  artistas = new Subject<any[]>()
  artistasUsuario = new Subject<any[]>()
  artista = new Subject<any>()

  constructor(private http:HttpClient) { 
    this.getArtistas();
  }

  getArtistas() {
    this.http.get<any[]>("/api/v1/artistas").subscribe(data => {
      this.artistas.next(data)
    });
  }

  getArtistasUsuario(id:string) {
    let direccion = "/api/v1/usuario/" + id + "/artistas";
    this.http.get<any[]>(direccion).subscribe(data => 
      this.artistasUsuario.next(data)
    );
  }
  
  getArtista(nombre:string): Promise<any> {
    let direccion = "/api/v1/artistas/" + nombre;
    return this.http.get(direccion).toPromise();
  }

  getArtistaById(id:string) {
    let direccion = "/api/v1/artistas/" + id;
    this.http.get<any>(direccion).subscribe(data => {
      this.artista.next(data)
    })
  }

  insertArtist(nombre:any, biografia:any, imagen:any, usuarioId:any) {
    let direccion = "/api/v1/artistas";

    return this.http.post(direccion, {
      "nombre": nombre,
      "biografia": biografia,
      "imagen": imagen,
      "usuarioId": usuarioId
    }).toPromise();
  }

  existeArtista(nombre:any){
    let direccion = "/api/v1/existe_artista";

    return this.http.post(direccion,{
      "artista": nombre
    }).toPromise();
  }

  modifyArtista(column:any, value:any, id:any): Promise<any>{
    let direccion = "/api/v1/artistas/" + id;

    return this.http.patch(direccion, {
      "columna": column,
      "valor": value
    }).toPromise();
  }
}
