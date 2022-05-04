import { DtoReserva } from './../model/reserva';
import { environment } from './../../../../../environments/environment.prod';
import { Reserva } from '../model/reserva';
import { HttpService } from '@core-service/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private path = `${environment.endpoint}/reservas`;

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoReserva[]>(`${this.path}`, this.http.optsName('Consultar reservas'));
  }

  public consultarPorNombreUsuario(nombreUsuario: string, idCancha: Number) {
    return this.http.doGet<DtoReserva[]>(`${this.path}/nombre-usuario/${nombreUsuario}/cancha/${idCancha}`,
      this.http.optsName('Consultar Rerservas por nombre de usuario y id Cancha'));
  }

  public consultarPorId(id: Number) {
    return this.http.doGet<DtoReserva>(`${this.path}/${id}`,
      this.http.optsName('Consultar Rerservas por id'));
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, number>(`${this.path}`, reserva, this.http.optsName('crear reservas'));
  }

  public actualizar(reserva: Reserva) {
    return this.http.doPut<Reserva, any>(`${this.path}/${reserva.id}`, reserva, this.http.optsName('actualizar reservas'));
  }

  public cancelarReserva(reserva: DtoReserva) {
    return this.http.doPut<DtoReserva, any>(`${this.path}/cancelar/${reserva.id}`, reserva, this.http.optsName('Cancelar reservas'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<any>(`${this.path}/${id}`, this.http.optsName('eliminar reservas'));
  }
}
