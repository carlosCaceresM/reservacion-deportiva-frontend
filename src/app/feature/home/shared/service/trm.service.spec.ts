import { Trm } from './../model/trm';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

import { TrmService } from './trm.service';

describe('TrmService', () => {
  let httpMock: HttpTestingController;
  let service: TrmService;
  const apiEndpointTrm = `${environment.endpoint}/trm`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrmService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia consultar el TRM', () => {
    const trm: Trm = new Trm('1234','COP','2022-05-04T00:00:00-05:00', '2022-05-04T00:00:00-05:00', '4016.34', 'true');
    service.consultar().subscribe(res => {
      expect(res).toEqual(trm);
    });
    const req = httpMock.expectOne(apiEndpointTrm);
    expect(req.request.method).toBe('GET');
    req.flush(trm);
  });
});
