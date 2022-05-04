import { ReservaService } from './reserva.service';
import { DtoReserva, Reserva } from './../model/reserva';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';


describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let service: ReservaService;
  const apiEndpointReservas = `${environment.endpoint}/reservas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });


  it('deberia listar Reservas', () => {
    const listaReservas: DtoReserva[] = [
      {
        id: 1, nombreUsuario: 'hiko',
        fecha: '2022-04-30 20:22:33',
        horasReservadas: 2,
        valorPagar: 70000,
        estado: true,
        cancha: 'cancha 1'
      }
    ];

    service.consultar().subscribe(reservas => {
      expect(reservas.length).toBe(1);
      expect(reservas).toEqual(listaReservas);
    });
    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('GET');
    req.flush(listaReservas);
  });


  it('deberia listar Reservas por nombre de usuario y id Cancha', () => {
    const nombreUsuario = 'Hiko';
    const idCancha = 1;

    const listaReservas: DtoReserva[] = [
      {
        id: 1, nombreUsuario: 'hiko',
        fecha: '2022-04-30 20:22:33',
        horasReservadas: 2,
        valorPagar: 70000,
        estado: true,
        cancha: 'cancha 1'
      }
    ];

    service.consultarPorNombreUsuario(nombreUsuario, idCancha).subscribe(reservas => {
      expect(reservas.length).toBe(1);
      expect(reservas).toEqual(listaReservas)
    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/nombre-usuario/${nombreUsuario}/cancha/${idCancha}`);
    expect(req.request.method).toBe('GET');
    req.flush(listaReservas);
  });


  it('deberia crear Reserva', () => {
    let reserva = new Reserva('Hiko', '2022-07-12 18:52:23', 2, 60000, 1);

    service.guardar(reserva).subscribe(respuesta => {
      expect(respuesta).toEqual(1);
    });
    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: 1 }));
  });

  it('deberia crear Reserva', () => {
    let reserva = new Reserva('Hiko', '2022-07-12 18:52:23', 2, 60000, 1);

    service.guardar(reserva).subscribe(respuesta => {
      expect(respuesta).toEqual(1);
    });
    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: 1 }));
  });

  it('deberia actualizar Reserva', () => {
    const id = 1;
    let reserva = new Reserva('Hiko', '2022-07-12 18:52:23', 2, 60000, 1,1);

    service.actualizar(reserva).subscribe(respuesta => {
      expect(respuesta).toEqual(null);
    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<any>());
  });

  it('deberia eliminar una reserva', () => {
    const id = 1;
    service.eliminar(id).subscribe(respuesta => {
      expect(respuesta).toEqual(null);
    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<any>());
  });

  it('deberia Cancelar una Reserva', () => {
    const id = 1;
    const reserva: DtoReserva ={
      id: 1, nombreUsuario: 'hiko',
      fecha: '2022-04-30 20:22:33',
      horasReservadas: 2,
      valorPagar: 70000,
      estado: true,
      cancha: 'cancha 1'
    }
    service.cancelarReserva(reserva).subscribe(respuesta => {
      expect(respuesta).toEqual(null);
    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/cancelar/${id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<any>());
  });

});
