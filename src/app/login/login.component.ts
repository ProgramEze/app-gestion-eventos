import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',

  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  logout() {
    this.loginService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Crear un objeto de tipo Login con valores por defecto si es necesario
      const loginData: Login = {
        email: email ?? '',
        password: password ?? '',
      };
      console.log(loginData);

      // Validación adicional para asegurarnos de que ambos campos tengan un valor
      if (email && password) {
        this.loginService.login(loginData).subscribe(
          (response) => {
            // Manejar la respuesta del servidor (guardar el token, redirigir al usuario, etc.)
            console.log('Token recibido:', response);
            //localStorage.setItem('token', response.token);
            this.router.navigate(['/lista-de-asistentes']); // Redirigir a la página principal
          },
          (error) => {
            console.error('Error al iniciar sesión:', error);
            this.errorMessage =
              'Credenciales inválidas. Por favor, inténtalo de nuevo.';
          }
        );
      } else {
        this.errorMessage = 'Por favor, completa todos los campos.';
      }
    }
  }
}
