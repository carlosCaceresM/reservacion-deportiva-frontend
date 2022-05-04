import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DtoReserva } from '../../shared/model/reserva';
import { ModalComponent } from './../../../../core/components/modal/modal.component';
import { ReservaService } from './../../shared/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  public confirmacionEliminar = '¿Desea eliminar la reserva?'
  public confirmacionCancelar = '¿Desea Cancelar la reserva?'
  public titulo: string = 'Reservas';
  public encabezadoTabla: string[] = ['id', 'nombreUsuario', 'fecha', 'hora', 'horasReservadas', 'valorPagar', 'cancha', 'acciones'];

  constructor(
    private reservasService: ReservaService,
    private modalService: NgbModal,
  ) { }

  listaReservas: DtoReserva[] = [];

  ngOnInit(): void {
    this.listarReservas();

  }

  private listarReservas() {
    this.reservasService.consultar().subscribe(datos => {
      this.listaReservas = datos;
    })
  }

  public eventoEliminarReserva(reserva: DtoReserva) {
    const refConfirmacion = this.modalService.open(ModalComponent, { animation: true, backdrop: 'static', keyboard: false });
    refConfirmacion.componentInstance.mensaje = this.confirmacionEliminar;

    refConfirmacion.result.then((value: boolean) => {
      if (value) {
        this.reservasService.eliminar(reserva.id).subscribe(() => {
          this.listarReservas();
        })
      }
    });
  }

  public cancelarReserva(reserva: DtoReserva) {
    const refConfirmacion = this.modalService.open(ModalComponent, { animation: true, backdrop: 'static', keyboard: false });
    refConfirmacion.componentInstance.mensaje = this.confirmacionCancelar;

    refConfirmacion.result.then((value: boolean) => {
      if (value) {
        this.reservasService.cancelarReserva(reserva).subscribe(() => {
          this.listarReservas();
        })
      }
    });
  }
}
