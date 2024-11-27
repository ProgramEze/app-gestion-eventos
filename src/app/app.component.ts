import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app.routes';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		FormsModule, // Add FormsModule to imports array
		MatTableModule,
		CommonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		AppRoutingModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	title = 'app-gestion-eventos';
	username!: string;
	loggedIn: boolean = false;
	esOrganizador!: boolean;

	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit() {
		this.loginService.checkSession();
		this.loginService.loggedIn$.subscribe((status) => {
			this.loggedIn = status;
			this.username = this.loginService.getNombre() || 'Invitado';
			this.esOrganizador = this.loginService.isRoleIn() === 'Organizador';
		});
	}

	logout() {
		this.loggedIn = false; // Cambiar estado a no logueado
		this.username = '';
		this.loginService.logout().subscribe(() => {});
	}
}
