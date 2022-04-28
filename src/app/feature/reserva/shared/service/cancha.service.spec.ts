import { DtoCancha } from './../model/DtoCancha';
import { CanchaService } from './cancha.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';


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

  it('Deberia crear el servicio', () => {
    const canchaService: CanchaService = TestBed.inject(CanchaService);
    expect(canchaService).toBeTruthy();
  });

  it('deberia listar Canchas por Tipo', () => {
    const idTipoCancha: number = 1;

    const dummyCanchas: DtoCancha[] = [
      { id: 1, nombre: 'cancha1', tipoCancha: 'Futbol', tafira: 60000 },
      { id: 2, nombre: 'cancha2', tipoCancha: 'Futbol', tafira: 60000 }
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
