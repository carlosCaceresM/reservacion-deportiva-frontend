import { DtoReserva } from './../../shared/model/reserva';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReservaService } from '../../shared/service/reserva.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'nombreUsuario', 'fecha', 'horasReservadas', 'valorPagar', 'cancha', 'acciones'];
  public dataSource: MatTableDataSource<DtoReserva>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.consultarReservas();

  }

  private consultarReservas() {
    this.reservaService.consultar().subscribe(reservas => {
      this.dataSource = new MatTableDataSource(reservas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}
