import { Component, OnInit } from '@angular/core';
import { AsistenteService } from '../asistente.service';
import { Asistente } from '../asistente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-asistente-list',
  standalone: true,
  providers: [AsistenteService],
  imports: [MatTableModule],
  templateUrl: './asistente-list.component.html',
  styleUrls: ['./asistente-list.component.css']
})
export class AsistenteListComponent implements OnInit {
  displayedColumns: string[] = ['idAsistente', 'nombre', 'domicilio', 'email', 'rol', 'estado'];
  dataSource = new MatTableDataSource<Asistente>();

  constructor(private asistenteService: AsistenteService) {}

  ngOnInit() {
    this.asistenteService.getAsistentes().subscribe(asistentes => {
      this.dataSource.data = asistentes;
    });
  }
}
