import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento.service';
import { Evento } from '../../models/evento.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../login/login.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EventoCreateComponent } from '../evento-create/evento-create.component';

@Component({
	selector: 'app-evento-list',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule],
	templateUrl: './evento-list.component.html',
	styleUrls: ['./evento-list.component.css'],
	providers: [EventoService],
})
export class EventoListComponent implements OnInit {
	eventos: Evento[] = [];
	isOrganizador: boolean = false;

	constructor(
		private eventoService: EventoService,
		private loginService: LoginService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.cargarEventos();
		this.isOrganizador = this.loginService.isRoleIn() === 'Organizador';
	}

	cargarEventos() {
		this.eventoService.getEventos().subscribe(
			(data) => {
				this.eventos = data;
			},
			(error) => {
				console.error('Error al cargar eventos:', error);
			}
		);
	}

	eliminarEvento(id: number) {
		if (confirm('¿Estás seguro de eliminar este evento?')) {
			this.eventoService.eliminarEvento(id).subscribe(
				() => {
					this.cargarEventos();
				},
				(error) => {
					console.error('Error al eliminar evento:', error);
				}
			);
		}
	}

	abrirFormulario(evento?: Evento) {
		const dialogRef = this.dialog.open(EventoCreateComponent, {
      data: evento,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarEventos();
    });
  }
}
