import { Component, OnInit } from '@angular/core';
import { AsistenteService } from '../asistente.service';
import { Asistente } from '../../models/asistente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-asistente-list',
	standalone: true,
	imports: [MatTableModule, NgIf, RouterLink, NgClass, MatProgressSpinnerModule, MatIconModule],
	templateUrl: './asistente-list.component.html',
	styleUrls: ['./asistente-list.component.css'],
})
export class AsistenteListComponent implements OnInit {
  dataSource: Asistente[] = [];
  displayedColumns: string[] = ['idAsistente', 'nombre', 'domicilio', 'email', 'rol', 'estado', 'acciones'];
  showDeleteConfirmation: boolean = false;
  selectedAsistenteId: number | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private asistenteService: AsistenteService, private router: Router) {}

  ngOnInit(): void {
    this.loadAsistentes();
  }

  // Carga la lista de asistentes
  loadAsistentes(): void {
    this.asistenteService.getAsistentes().subscribe({
      next: (asistentes) => {
        this.dataSource = asistentes;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los asistentes';
        this.loading = false;
      }
    });
  }

  // Elimina un asistente
  deleteAsistente(idAsistente: number): void {
    this.selectedAsistenteId = idAsistente;
    this.showDeleteConfirmation = true;
  }

  // Confirma la eliminación
  confirmDelete(): void {
    if (this.selectedAsistenteId !== null) {
      this.asistenteService.eliminarAsistente(this.selectedAsistenteId).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter((asistente) => asistente.idAsistente !== this.selectedAsistenteId);
          this.showDeleteConfirmation = false;
          this.selectedAsistenteId = null;
        },
        error: () => {
          this.errorMessage = 'No se pudo eliminar al asistente';
          this.showDeleteConfirmation = false;
          this.selectedAsistenteId = null;
        }
      });
    }
  }

  // Cancela la eliminación
  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.selectedAsistenteId = null;
  }
}
