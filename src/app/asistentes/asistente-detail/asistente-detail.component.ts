import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenteService } from '../asistente.service';
import { Asistente } from '../../models/asistente.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-asistente-detail',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './asistente-detail.component.html',
  styleUrls: ['./asistente-detail.component.css']
})
export class AsistenteDetailComponent implements OnInit {
  asistenteForm: FormGroup;
  asistenteId!: number;
  mensaje: string = ''; // Para mostrar mensajes de éxito, error, o advertencia
  mensajeClase: string = ''; // Clase CSS para el mensaje (e.g., 'success', 'error', 'warning')

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private asistenteService: AsistenteService
  ) {
    this.asistenteForm = this.fb.group({
      nombre: [''],
      domicilio: [''],
      email: [''],
      rol: [''],
      estado: [false]
    });
  }

  ngOnInit(): void {
    this.asistenteId = +this.route.snapshot.paramMap.get('id')!;

    if (this.asistenteId) {
      this.asistenteService.getAsistente(this.asistenteId).subscribe(
        (asistente: Asistente) => {
          this.asistenteForm.patchValue(asistente); // Rellenar el formulario con los datos del asistente
        },
        (error) => {
          console.error('Error al cargar los datos del asistente', error);
          this.router.navigate(['/asistentes']);
        }
      );
    }
  }

  onEdit(): void {
    // Navegar a la vista de edición
    this.router.navigate([`/asistentes/edit/${this.asistenteId}`]);
  }

  onCancel(): void {
    // Volver a la lista de asistentes
    this.router.navigate(['/asistentes']);
  }
}
