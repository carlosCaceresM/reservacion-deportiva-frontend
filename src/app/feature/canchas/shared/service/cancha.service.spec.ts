import { Cancha } from './../model/cancha';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

import { CanchaService } from './cancha.service';

describe('CanchaService', () => {
  let httpMock: HttpTestingController;
  let service: CanchaService;
  const apiEndpointConsultaCanchaPorTipo = `${environment.endpoint}/canchas/tipo`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CanchaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CanchaService);
  });


  it('deberia listar Canchas por Tipo', () => {
    const idTipoCancha: number = 1;

    const dummyCanchas = [
      new Cancha(1, 'cancha1','Futbol',60000),
      new Cancha(2, 'cancha2','Futbol',60000)
    ];
    service.consultarPorTipoCancha(idTipoCancha).subscribe(canchas => {
      expect(canchas.length).toBe(2);
      expect(canchas).toEqual(dummyCanchas);
    });
    const req = httpMock.expectOne(`${apiEndpointConsultaCanchaPorTipo}/${idTipoCancha}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCanchas);
  });
});
