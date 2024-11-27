import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [NgIf],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	loggedIn: boolean = false;
	isOrganizador: boolean = false;
	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit(): void {
		this.loginService.loggedIn$.subscribe((status) => {
			this.loggedIn = status;
		});
		this.loginService.checkSession();
	}

	// Métodos para la navegación programática
	navigateToPerfil(): void {
		this.router.navigate(['/perfil']);
	}

	navigateToAsistentes(): void {
		this.router.navigate(['/asistentes']);
	}

	navigateToLogin(): void {
		this.router.navigate(['/login']);
	}

	navigateToRegistrar(): void {
		this.router.navigate(['/registrar']);
	}
}
