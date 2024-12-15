// explorado.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Explorado {
  id: {
    idUsuario: number;
    idLugar: number;
  };
  favorito: boolean;
  nombre_usuario?: string; // Nombre del usuario
  nombre_lugar?: string;   // Nombre del lugar
}
@Injectable({
  providedIn: 'root'
})
export class ExploradoService {

  private apiUrl = 'http://localhost:8080/api/explorado'; // URL del backend

  constructor(private http: HttpClient) {}

  getExplorados(): Observable<Explorado[]> {
    return this.http.get<Explorado[]>(this.apiUrl);
  }

  getExplorado(idUsuario: number, idLugar: number): Observable<Explorado> {
    return this.http.get<Explorado>(`${this.apiUrl}/${idUsuario}/${idLugar}`);
  }

  addExplorado(explorado: Explorado): Observable<Explorado> {
    return this.http.post<Explorado>(this.apiUrl, explorado);
  }

  updateExplorado(idUsuario: number, idLugar: number, explorado: Explorado): Observable<Explorado> {
    return this.http.put<Explorado>(`${this.apiUrl}/${idUsuario}/${idLugar}`, explorado);
  }

  deleteExplorado(idUsuario: number, idLugar: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idUsuario}/${idLugar}`);
  }
}
