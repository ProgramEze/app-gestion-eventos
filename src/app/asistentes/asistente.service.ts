import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistente } from './asistente.model';


@Injectable({ providedIn: 'root' })
export class AsistenteService {
  private baseUrl = 'http://localhost:5000/asistentes'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtiene todos los asistentes
  getAsistentes(): Observable<any> {
    //const cookie = this.cookieService.get('connect.sid');
    const headers = new HttpHeaders({
      'Cookie': `connect.sid=${getCookie('connect.sid')}`
    });

    return this.http.get<any>(`${this.baseUrl}/`, { headers });
  }

  // Obtiene un asistente por su idAsistente
  getAsistente(idAsistente: number): Observable<Asistente> {
    return this.http.get<Asistente>(`${this.baseUrl}/${idAsistente}`);
  }

  // Actualiza un asistente existente
  actualizarAsistente(
    idAsistente: number,
    asistente: Asistente
  ): Observable<Asistente> {
    return this.http.put<Asistente>(
      `${this.baseUrl}/${idAsistente}`,
      asistente
    );
  }

  // Elimina un asistente
  eliminarAsistente(idAsistente: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAsistente}`);
  }
}

function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
