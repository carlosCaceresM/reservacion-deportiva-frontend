export class Reserva {

  id: number;
  nombreUsuario: string;
  fecha: any;
  horasReservadas: number;
  valorPagar: number;
  estado: boolean;
  idCancha: number;

  constructor(id: number, nombreUsuario: string, fecha: any,
    horasReservadas: number, valorPagar: number, idCancha: number
  ) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.fecha = fecha;
    this.horasReservadas = horasReservadas;
    this.valorPagar = valorPagar;
    this.idCancha = idCancha;
  }
}

export interface DtoReserva {

  id: number;
  nombreUsuario: string;
  fecha: any;
  horasReservadas: number;
  valorPagar: number;
  estado: boolean;
  cancha: string;
}
