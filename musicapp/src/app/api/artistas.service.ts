import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistasService {
  artistas = new Subject<any[]>()

  constructor(private http:HttpClient) { 
    this.getArtistas();
  }

  getArtistas() {
    this.http.get<any[]>("/api/v1/artistas").subscribe(data => {
      this.artistas.next(data)
    });
    }
  
  getArtista(nombre:string): Promise<any> {
    let direccion = "/api/v1/artistas/" + nombre;
    return this.http.get(direccion).toPromise();
  }
}
