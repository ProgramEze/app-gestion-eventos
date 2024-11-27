import { Component } from '@angular/core';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../evento.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-evento-create',
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule, NgIf],
	providers: [EventoService],
	templateUrl: './evento-create.component.html',
	styleUrls: ['./evento-create.component.css'],
})
export class EventoCreateComponent {
	evento: Evento = {
		idEvento: 0,
		nombre: '',
		fecha: new Date(),
		ubicacion: '',
		descripcion: '',
	};
	mensajeExito: string = ''; // Mensaje de éxito
	mensajeError: string = ''; // Mensaje de error

	constructor(private eventoService: EventoService) {}

	// Método para manejar el envío del formulario
	onSubmit() {
		this.eventoService.crearEvento(this.evento).subscribe(
			(nuevoEvento) => {
				this.mensajeExito = 'Evento creado exitosamente!';
				console.log('Evento creado:', nuevoEvento);
			},
			(error) => {
				this.mensajeError =
					'Hubo un error al crear el evento. Intenta nuevamente.';
				console.error('Error al crear el evento', error);
			}
		);
	}
}
