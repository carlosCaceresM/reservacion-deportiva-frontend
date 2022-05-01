import { DtoReserva } from './../model/reserva';
import { environment } from './../../../../../environments/environment.prod';
import { Reserva } from '../model/reserva';
import { HttpService } from '@core-service/http.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reservaCambio: Subject<DtoReserva[]> = new Subject<DtoReserva[]>();

  private path = `${environment.endpoint}/reservas`;

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoReserva[]>(`${this.path}`, this.http.optsName('Consultar reservas'));
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

  public eliminar(reserva: Reserva) {
    return this.http.doDelete<any>(`${this.path}/${reserva.id}`, this.http.optsName('eliminar reservas'));
  }

  public obtenerCambioReserva() {
    return this.reservaCambio.asObservable();
  }

  public enviarCambioReserva(lista: DtoReserva[]) {
    this.reservaCambio.next(lista);
  }
}
