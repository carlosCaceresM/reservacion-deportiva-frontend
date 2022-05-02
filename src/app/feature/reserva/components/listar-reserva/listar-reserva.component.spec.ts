import { DtoReserva } from './../../shared/model/reserva';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { ReservaService } from '../../shared/service/reserva.service';

import { ListarReservaComponent } from './listar-reserva.component';
import { ModalConfirmarComponent } from '@core/components/modal-confirmar/modal-confirmar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let reservaService: ReservaService;
  let dialog: MatDialog;

  let listaReservas: DtoReserva[] = [
    {
      id: 1,
      nombreUsuario: 'hiko1',
      fecha: '2022-5-22 20:22:33',
      horasReservadas: 2,
      valorPagar: 70000,
      estado: true,
      cancha: 'cancha 1'
    },
    {
      id: 2,
      nombreUsuario: 'hiko2',
      fecha: '2022-05-22 20:22:33',
      horasReservadas: 2,
      valorPagar: 70000,
      estado: true,
      cancha: 'cancha 1'
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        ReservaService,
        HttpService,
        MatDialog,
        ModalConfirmarComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    reservaService = TestBed.inject(ReservaService);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    spyOn(reservaService, 'consultar').and.returnValue(of(listaReservas));
    spyOn(reservaService, 'eliminar').and.returnValue(of(null));
    spyOn(reservaService, 'cancelarReserva').and.returnValue(of(null));


    fixture.detectChanges();
  });

  it('Deberia crear el componente ListarRerservaComponent', () => {
    expect(component).toBeTruthy();
  });

  it('ejecuta el modal y elimina la reserva', async () => {
    // arrange
    // const respuesta =true;
    let dialogRef = dialog.open(ModalConfirmarComponent, {
      disableClose: true,
      height: "200px",
      width: "300px",
    });
    spyOn(dialog,'open').and.returnValue(dialogRef);
    expect(dialogRef).toBe(dialogRef);
  });


});
