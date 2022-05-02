import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Subject } from 'rxjs';
import { Reserva } from '../model/reserva';
import { environment } from './../../../../../environments/environment.prod';
import { DtoReserva } from './../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reservaCambio: Subject<DtoReserva[]> = new Subject<DtoReserva[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  private path = `${environment.endpoint}/reservas`;

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoReserva[]>(`${this.path}`, this.http.optsName('Consultar reservas'));
  }

  public consultarPorId(id: Number) {
    return this.http.doGet<DtoReserva>(`${this.path}/${id}`,
      this.http.optsName('Consultar Rerservas por id'));
  }


  public consultarPorNombreUsuario(nombreUsuario: string, idCancha: Number) {
    return this.http.doGet<DtoReserva[]>(`${this.path}/nombre-usuario/${nombreUsuario}/cancha/${idCancha}`,
      this.http.optsName('Consultar Rerservas por nombre de usuario y id Cancha'));
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, number>(`${this.path}`, reserva, this.http.optsName('crear reservas'));
  }

  public actualizar(reserva: Reserva) {
    return this.http.doPut<Reserva, any>(`${this.path}/${reserva.id}`, reserva, this.http.optsName('actualizar reservas'));
  }

  public cancelarReserva(reserva: Reserva) {
    return this.http.doPut<Reserva, any>(`${this.path}/cancelar/${reserva.id}`, reserva, this.http.optsName('Cancelar reservas'));
  }

  public eliminar(reserva: Reserva) {
    return this.http.doDelete<any>(`${this.path}/${reserva.id}`, this.http.optsName('eliminar reservas'));
  }

  public obtenerCambioReserva() {
    return this.reservaCambio.asObservable();
  }

  public enviarCambioReserva(lista: DtoReserva[]) {
    this.reservaCambio.next(lista);
  }

  public enviarMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  public obtenerMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
