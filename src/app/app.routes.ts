import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { AsistenteListComponent } from './asistentes/asistente-list/asistente-list.component';
import { LoginGuard } from './login.guard';
import { AsistenteDetailComponent } from './asistentes/asistente-detail/asistente-detail.component';
import { AsistenteEditComponent } from './asistentes/asistente-edit/asistente-edit.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoCreateComponent } from './eventos/evento-create/evento-create.component';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{ path: '', component: HomeComponent },
	{ path: 'registrar', component: RegistroComponent },
	{
		path: 'perfil',
		component: PerfilComponent,
		canActivate: [LoginGuard],
		data: { roles: ['Organizador', 'Asistente'] },
	},
	{
		path: 'asistentes',
		component: AsistenteListComponent
	},
	{
		path: 'asistentes/:id',
		component: AsistenteDetailComponent,
		canActivate: [LoginGuard],
		data: { roles: ['Organizador', 'Asistente'] },
	},
	{
		path: 'asistentes/edit/:id',
		component: AsistenteEditComponent,
		canActivate: [LoginGuard],
		data: { roles: ['Organizador', 'Asistente'] },
	},
	{
		path: 'eventos',
		component: EventoListComponent,
		canActivate: [LoginGuard],
		data: { roles: ['Organizador', 'Asistente'] },
	},
	{
		path: 'eventos/create',
		component: EventoCreateComponent, // Añadí esto para el detalle del evento
		canActivate: [LoginGuard],
		data: { roles: ['Organizador'] },
	},
	{
		path: 'eventos/edit/:id',
		component: EventoEditComponent,
		canActivate: [LoginGuard],
        data: { roles: ['Organizador'] },
	},
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)], // Cambié esto a forChild
	exports: [RouterModule],
})
export class AppRoutingModule {}
