import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ReservaService } from '../../shared/service/reserva.service';
import { DtoReserva, Reserva } from './../../shared/model/reserva';
import { CrearReservaComponent } from './../crear-reserva/crear-reserva.component';
import { ModalConfirmarComponent } from './../../../../core/components/modal-confirmar/modal-confirmar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

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
    private reservaService: ReservaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.consultarReservas();
    this.obtenerCambioReserva();

  }

  public filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  public eliminar(reserva: Reserva){
    let dialogRef = this.dialog.open(ModalConfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",

    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.reservaService.eliminar(reserva).pipe(switchMap(()=>{
          return this.reservaService.consultar();
        }))
        .subscribe(data =>{
          this.reservaService.enviarCambioReserva(data);
        })
      }
    })
  }

  public cancelarReserva(reserva: Reserva){
    let dialogRef = this.dialog.open(ModalConfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",

    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.reservaService.cancelarReserva(reserva).pipe(switchMap(()=>{
          return this.reservaService.consultar();
        }))
        .subscribe(data =>{
          this.reservaService.enviarCambioReserva(data);
        })
      }
    })
  }

  private consultarReservas(reservas?: any) {
    this.reservaService.consultar().subscribe(datos => {
      reservas = datos;
      this.dataSource = new MatTableDataSource(reservas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private obtenerCambioReserva() {
    this.reservaService.obtenerCambioReserva().subscribe((datos) => {
      this.consultarReservas(datos);
    });
  }

  public abrirModal(id?: number) {
    this.dialog.open(CrearReservaComponent, {
      disableClose: true,
      height: '400px',
      width: '500px',
      data: {
        id: id
      },
    })
  }

}
