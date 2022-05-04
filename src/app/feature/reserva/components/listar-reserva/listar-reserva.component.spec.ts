import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from '@core/components/modal/modal.component';
import { HttpService } from '@core/services/http.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';

import { ReservaService } from '../../shared/service/reserva.service';
import { DtoReserva } from './../../shared/model/reserva';
import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let reservaService: ReservaService;
  let ngbModal:NgbModal;
  let modalRef:NgbModalRef;

  let spyReservaServiceConsultar: jasmine.Spy;

  let reservas: DtoReserva[] = [
    {
      id: 1,
      nombreUsuario: 'Hiko',
      fecha: '2022-07-15 18:00:00',
      horasReservadas: 2,
      valorPagar: 60000,
      estado: true,
      cancha: 'Cancha 1'
     }

  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarReservaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [ReservaService, HttpService,  NgbModal, NgbActiveModal, ModalComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    ngbModal = TestBed.inject(NgbModal);
    spyReservaServiceConsultar = spyOn(reservaService, 'consultar').and.returnValue(of(reservas));
    spyOn(reservaService, 'eliminar').and.returnValue(of(null));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia listar las reservas', () => {
    component['listarReservas']();

    expect(reservaService.consultar).toHaveBeenCalled();
    expect(1).toBeGreaterThanOrEqual(component.listaReservas.length);
    expect(reservas).toBe(component.listaReservas);
  });

  it('deberia fallar al listar las reservas', async () => {
    const error = 'error';
    spyReservaServiceConsultar.and.returnValue(throwError(error));

    reservaService.consultar().subscribe(
      ()=>{},
      (err)=>expect(error).toEqual(err)
    );
    component['listarReservas']();
    expect(reservaService.consultar).toHaveBeenCalled();
  });


  it('ejecuta el modal y lo acepta para eliminar la reserva', async () => {
    const resuelve = true;
    modalRef = ngbModal.open(ModalComponent, { animation: true, backdrop: 'static', keyboard: false });
    spyOn(ngbModal,'open').and.returnValue(modalRef);

    component.eventoEliminarReserva(component.listaReservas[0]);
    modalRef.close(resuelve);
    modalRef.result = new Promise((resolve) => {resolve(resuelve)});

    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
  });

  it('ejecuta el modal y lo cancela para no eliminar la reserva', async () => {
    const resuelve = false;
    modalRef = ngbModal.open(ModalComponent, { animation: true, backdrop: 'static', keyboard: false });
    spyOn(ngbModal,'open').and.returnValue(modalRef);

    component.eventoEliminarReserva(component.listaReservas[0]);
    modalRef.close(resuelve);
    modalRef.result = new Promise((resolve) => {resolve(resuelve)});

    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
  });

});
