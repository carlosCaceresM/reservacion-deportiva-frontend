import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DtoCancha, DtoTipoCancha } from './../../shared/model/DtoCancha';
import { CanchaService } from './../../shared/service/cancha.service';
import { Component, OnInit } from '@angular/core';

import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';

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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initFormReserva();
  }


  private initFormReserva() {
    this.formReserva = new FormGroup({

      nombreUsuario: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      horasReservadas: new FormControl(1, Validators.required),
      tipoCancha: new FormControl(0, Validators.required),
      idCancha: new FormControl(0, Validators.required)
    });
  }

  public guardar() {

    console.log(this.crearEntidad());

    this.reservaService.guardar(this.crearEntidad()).pipe(switchMap(() => {
      return this.reservaService.consultar();
    })).subscribe(datos =>{
      this.reservaService.enviarCambioReserva(datos)
      console.log("parece que gaurdo");
     this.limpiar();
    })
    this.router.navigate(['/reserva']);
  }

  private crearEntidad(): Reserva {

    const id: number = 0;

    const fecha: string = moment(`${this.formReserva.controls.fecha.value} ${this.formReserva.controls.hora.value}`)
      .format('YYYY-MM-DD HH:mm:ss');

    console.log("esta es la puta fecha: " + fecha)
    const cancha: DtoCancha = this.formReserva.value['idCancha'];
    const nombreUsuario: string = this.formReserva.controls.nombreUsuario.value;

    const horasReservadas: number = this.formReserva.value['horasReservadas'];
    const idCancha: number = cancha.id;
    const tafira: number = cancha.tafira;

    return new Reserva(id, nombreUsuario, fecha, horasReservadas, tafira, idCancha);
  }


  public listaCanchasPorTipo(event) {
    this.listaCanchas$ = this.canchaService.consultarPorTipoCancha(event);
  }

  public limpiar() {
    this.formReserva.reset();
  }
}


