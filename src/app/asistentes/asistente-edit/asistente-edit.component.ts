import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenteService } from '../asistente.service';
import { Asistente } from '../../models/asistente.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-asistente-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './asistente-edit.component.html',
  styleUrls: ['./asistente-edit.component.css']
})
export class AsistenteEditComponent implements OnInit {
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
      nombre: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['Asistente', [Validators.required]],
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

  onCancel(): void {
    // Volver a la lista de asistentes
    this.router.navigate(['/asistentes']);
  }

  onSubmit(): void {
    if (this.asistenteForm.valid) {
      const asistenteData: Asistente = this.asistenteForm.value;
      asistenteData.idAsistente = this.asistenteId;

      this.asistenteService.actualizarAsistente(this.asistenteId, asistenteData).subscribe(
        (response: any) => {
          // Si la respuesta incluye un mensaje de éxito
          this.mensaje = response.message || '¡Asistente actualizado exitosamente!';
          this.mensajeClase = 'success'; // Mensaje de éxito
          setTimeout(() => {
            this.router.navigate(['/asistentes']); // Redirigir a la lista de asistentes
          }, 2000); // Esperar 2 segundos antes de redirigir
        },
        (error) => {
          console.error('Error al actualizar el asistente', error);
          if (error.status === 400) {
            this.mensaje = error.error.error || 'Hubo un problema con la actualización. Revisa los datos.';
            this.mensajeClase = 'warning'; // Mensaje de advertencia
          } else {
            this.mensaje = 'Error al actualizar el asistente. Intenta nuevamente más tarde.';
            this.mensajeClase = 'error'; // Mensaje de error
          }
        }
      );
    } else {
      this.mensaje = 'Por favor, completa todos los campos requeridos.';
      this.mensajeClase = 'warning'; // Mensaje de advertencia
    }
  }
}
