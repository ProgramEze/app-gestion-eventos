import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  errorMessage: string = '';

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
	if(this.loginService.isLoggedIn()){
		this.router.navigate(['/']);
	}
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      domicilio: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  registrar() {
    if (this.registroForm.valid) {
      this.http
        .post('http://localhost:5000/registrar', this.registroForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            // Manejar la respuesta exitosa (por ejemplo, mostrar un mensaje de éxito)
            this.router.navigate(['/login']);
            this.errorMessage = '';
          },
          (error) => {
            console.error(error.message);
            // Manejar los errores (por ejemplo, mostrar un mensaje de error al usuario)
            //this.errorMessage = error;
          }
        );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
