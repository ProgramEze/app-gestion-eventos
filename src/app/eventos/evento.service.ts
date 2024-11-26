import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({ providedIn: 'root' })
export class EventoService {
	private baseUrl = 'http://localhost:5000/eventos'; // URL base de tu API

	constructor(private http: HttpClient) {}

	// Crea un nuevo evento
	crearEvento(evento: Evento): Observable<Evento> {
		return this.http.post<Evento>(this.baseUrl, evento, {
			withCredentials: true,
		});
	}
	
	// Obtiene la lista de eventos
	getEventos(): Observable<Evento[]> {
		return this.http.get<Evento[]>(this.baseUrl, { withCredentials: true });
	}

	getEventosFuturos(): Observable<Evento[]> {
		return this.http.get<Evento[]>(`${this.baseUrl}/futuros`, {
			withCredentials: true,
		});
	}

	getEvento(idEvento: number): Observable<Evento> {
		return this.http.get<Evento>(`${this.baseUrl}/${idEvento}`, {
			withCredentials: true,
		});
	}

	// Actualiza un evento existente
	actualizarEvento(idEvento: number, evento: Evento): Observable<Evento> {
		return this.http.put<Evento>(`${this.baseUrl}/${idEvento}`, evento, {
			withCredentials: true,
		});
	}

	// Elimina un evento
	eliminarEvento(id: number): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}/${id}`, {
			withCredentials: true,
		});
	}
}
