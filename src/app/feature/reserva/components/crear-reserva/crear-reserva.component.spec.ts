import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { Reserva } from '../../shared/model/reserva';

// import { Reserva } from '../../shared/model/reserva';
import { CanchaService } from '../../shared/service/cancha.service';
import { ReservaService } from '../../shared/service/reserva.service';
import { ModalComponent } from './../../../../core/components/modal/modal.component';
import { DtoCancha } from './../../shared/model/DtoCancha';
import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  let canchaService: CanchaService;
  let router: Router;

  let spyCanchasServiceConsultarPorTipo: jasmine.Spy;
  // let spyRouter: jasmine.Spy;

  let canchas: DtoCancha[] = [
    {
      id: 1,
      nombre: 'Cancha test',
      tipoCancha: 'Futbol',
      tafira: 60000
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
      imports: [HttpClientModule, RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule],
      providers: [ReservaService, HttpService, NgbModal, ModalComponent, CanchaService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;

    reservaService = TestBed.inject(ReservaService);
    canchaService = TestBed.inject(CanchaService);
    router = TestBed.inject(Router);
    spyOn(reservaService, 'guardar').and.returnValue(of(null));
    spyCanchasServiceConsultarPorTipo = spyOn(canchaService, 'consultarPorTipoCancha').and.returnValue(of(canchas));
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia listar las canchas por Tipo de cancha', () => {

    const idTipoCancha = 1;
    component.consultarCanchasPorTipo(idTipoCancha);

    expect(canchaService.consultarPorTipoCancha).toHaveBeenCalled();
    expect(1).toBeGreaterThanOrEqual(component.listaCanchas.length);
    expect(component.listaCanchas).toEqual(canchas);
  });

  it('deberia fallar al listar canchas por Tipo de cancha', () => {

    const error = 'error';
    spyCanchasServiceConsultarPorTipo.and.returnValue(throwError(error));

    canchaService.consultarPorTipoCancha(null).subscribe(
      () => { },
      (err) => expect(error).toEqual(err)
    );
    component.consultarCanchasPorTipo(null);
    expect(canchaService.consultarPorTipoCancha).toHaveBeenCalled();
  });


  it('deberia crear el objeto Reserva', () => {

    const reserva: Reserva = new Reserva('Usuario Test', '2022-07-12 18:52:00', 1, undefined, undefined);

    component.formReserva.controls.nombreUsuario.setValue('Usuario Test');
    component.formReserva.controls.fecha.setValue('2022-07-12');
    component.formReserva.controls.hora.setValue('18:52');
    component.formReserva.controls.horasReservadas.setValue(1);
    component.formReserva.controls.tipoCancha.setValue(1);
    component.formReserva.controls.idCancha.setValue(4);

    const result = component['crearEntidad']();

    expect(reserva).toEqual(result);
  });

  it('deberia guardar la reserva', async () => {

    component.formReserva.controls.nombreUsuario.setValue('Usuario Test');
    component.formReserva.controls.fecha.setValue('2022-08-16');
    component.formReserva.controls.hora.setValue('19:00');
    component.formReserva.controls.tipoCancha.setValue(1);
    component.formReserva.controls.horasReservadas.setValue(1);
    component.formReserva.controls.idCancha.setValue(4);

    expect(component.formReserva.valid).toBeTruthy();

    component.crearReserva();
  });

  it('deberia hacer submit pero el formulario es invalido', () => {
    component.crearReserva();
    expect(component.formReserva.invalid).toBeTruthy();
  });

});
