import { Component, Inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogModule,
} from '@angular/material/dialog';
import { EventoService } from '../evento.service';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-evento-edit',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		MatDialogModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	templateUrl: './evento-edit.component.html',
	styleUrls: ['./evento-edit.component.css'],
})
export class EventoEditComponent implements OnInit {
	eventoForm: FormGroup;
	mensajeExito: string = ''; // Mensaje de éxito
	mensajeError: string = ''; // Mensaje de error

	constructor(
		private fb: FormBuilder,
		private eventoService: EventoService,
		private dialogRef: MatDialogRef<EventoEditComponent>,
		@Inject(MAT_DIALOG_DATA) public evento: Evento // Recibimos el evento seleccionado
	) {
		this.eventoForm = this.fb.group({
			nombre: [evento.nombre, Validators.required],
			descripcion: [evento.descripcion, Validators.required],
			fecha: [evento.fecha, Validators.required],
			ubicacion: [evento.ubicacion, Validators.required],
		});
	}

	ngOnInit(): void {}

	// Método para enviar la actualización del evento
	onSubmit(): void {
		if (this.eventoForm.valid) {
			console.log(this.eventoForm.value);
			console.log(this.evento);
			const eventoActualizado = {
				...this.evento,
				...this.eventoForm.value,
			};
			const idEvento = ''+this.evento.idEvento;
			console.log('Evento actulizado: ' + eventoActualizado.nombre);
			this.eventoService
				.actualizarEvento(idEvento, this.evento)
				.subscribe(
					() => {
						this.dialogRef.close();
					},
					(error) => {
						if(error.status === 404) {
							this.mensajeError = 'No se ha cambiado ningún campo del evento.';
						} else if(error.status === 500) {
							this.mensajeError = 'Hubo un error al actualizar el evento. Intenta nuevamente.';
						}
						console.error('Error al actualizar el evento:', error);
					}
				);
		}
	}

	// Método para cancelar la edición y cerrar el diálogo
	cancelar(): void {
		this.dialogRef.close();
	}
}
