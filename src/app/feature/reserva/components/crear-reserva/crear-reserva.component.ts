import { Component, Inject, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReservaService } from '../../shared/service/reserva.service';
import { CanchaService } from './../../shared/service/cancha.service';
import { Reserva } from './../../shared/model/reserva';
import { DtoCancha, DtoTipoCancha } from './../../shared/model/DtoCancha';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  public listaTipoCanchas: DtoTipoCancha[] = [
    { id: 1, nombre: 'Futbol' },
    { id: 2, nombre: 'Boleibol' }
  ];


  public horas: string[] = ['17:00', '18:00', '19:00', '20:00', '21:00'];

  public listaCanchas$: Observable<DtoCancha[]>;

  public formReserva: FormGroup;


  constructor(
    private canchaService: CanchaService,
    private reservaService: ReservaService,

     private dialogRef: MatDialogRef<CrearReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initFormReserva();
    this.cargarDatosEdicion();
  }

  public listaCanchasPorTipo(event) {
    this.listaCanchas$ = this.canchaService.consultarPorTipoCancha(event);
  }

  public guardar() {

    this.reservaService.guardar(this.crearEntidad()).pipe(switchMap(() => {
      return this.reservaService.consultar();
    })).subscribe(datos => {
      this.reservaService.enviarCambioReserva(datos);
      this.formReserva.reset();
      this.dialogRef.close(true);

    })
  }

  public actualizar() {
    this.reservaService.actualizar(this.crearEntidad()).pipe(switchMap(() => {
      return this.reservaService.consultar();
    })).subscribe(datos => {
      this.reservaService.enviarCambioReserva(datos);
      this.formReserva.reset();
      this.dialogRef.close(true);

    })
  }

  private initFormReserva() {
    this.formReserva = new FormGroup({
      id: new FormControl(0, Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      horasReservadas: new FormControl(1, Validators.required),
      tipoCancha: new FormControl(0, Validators.required),
      idCancha: new FormControl(0, Validators.required)
    });
  }

  private crearEntidad(): Reserva {
    const fecha: string = moment(`${this.formReserva.controls.fecha.value} ${this.formReserva.controls.hora.value}`)
      .format('YYYY-MM-DD HH:mm:ss');

    const id: number = this.formReserva.value['id'];;
    const cancha: DtoCancha = this.formReserva.value['idCancha'];
    const nombreUsuario: string = this.formReserva.value['nombreUsuario'];
    const horasReservadas: number = this.formReserva.value['horasReservadas'];
    const idCancha: number = cancha.id;
    const tafira: number = cancha.tafira;

    return new Reserva(id, nombreUsuario, fecha, horasReservadas, tafira, idCancha);
  }

  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.reservaService.consultarPorId(this.data.id).subscribe(res => {
        let fecha = moment(res.fecha).format('YYYY-MM-DD');
        let hora = moment(res.fecha).format('HH:mm');

        this.formReserva.setValue({
          id: res.id,
          nombreUsuario: res.nombreUsuario,
          fecha: fecha,
          hora: hora,
          horasReservadas: res.horasReservadas,
          tipoCancha: new FormControl(0, Validators.required),
          idCancha: new FormControl(0, Validators.required)
        });
      });
    }
  }
}


