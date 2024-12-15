// plato.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from './usuario.service';
import { Explorado } from './explorado.service';

export interface Lugar {
  id?: number;
  nombre: string;
  ciudad: string;
  coordenadasx: Float32Array;
  coordenadasy: Float32Array;
  categoria: string;
}

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  private apiUrl = 'http://localhost:8080/api/lugar';

  constructor(private http: HttpClient) {}

  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }

  getLugar(id: number): Observable<Lugar> {
    return this.http.get<Lugar>(`${this.apiUrl}/${id}`);
  }

  addLugar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  updateLugar(lugar: Lugar): Observable<Lugar> {
    return this.http.put<Lugar>(`${this.apiUrl}/${lugar.id}`, lugar);
  }

  deleteLugar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
