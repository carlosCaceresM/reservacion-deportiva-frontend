import { Reserva } from './../../shared/model/reserva';
import { ReservaService } from './../../shared/service/reserva.service';
import { DtoCancha, DtoTipoCancha } from './../../shared/model/DtoCancha';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CanchaService } from '../../shared/service/cancha.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  HORAS_MINIMAS_A_RESERVAR = 1;
  HORAS_MAXIMAS_A_RESERVAR = 5;
  HORA_INICIAL = '17:00';

  public fechaActual = moment();
  public listaCanchas: DtoCancha[];
  public formReserva: FormGroup;

  public titulo: string = 'Crear Reserva';
  public horas: string[] = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  public listaTipoCanchas: DtoTipoCancha[] = [
    { id: 1, nombre: 'Futbol' },
    { id: 2, nombre: 'Boleibol' }
  ];

  constructor(
    private canchaService: CanchaService,
    private reservaService: ReservaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initFormReserva();
  }

  public consultarCanchasPorTipo(event) {
    this.canchaService.consultarPorTipoCancha(event).subscribe(datos => {
      this.listaCanchas = datos;
    })
  }

  public crearReserva() {
      this.reservaService.guardar(this.crearEntidad()).subscribe(()=>{
        this.formReserva.reset();
        this.router.navigate(['/reserva']);
      })
  }

  private crearEntidad(): Reserva {
    const nombreUsuario: string = this.formReserva.value['nombreUsuario'];
    const horasReservadas: number = this.formReserva.value['horasReservadas'];
    const fecha: string = moment(`${this.formReserva.value['fecha']} ${this.formReserva.value['hora']}`)
      .format('YYYY-MM-DD HH:mm:ss');
    const idCancha: number = this.formReserva.value['idCancha'].id;
    const tafira: number = this.formReserva.value['idCancha'].tafira;

    return new Reserva(nombreUsuario, fecha, horasReservadas, tafira, idCancha);
  }

  private initFormReserva() {
    const fecha: string = this.fechaActual.format("YYYY-MM-DD");
    this.formReserva = new FormGroup({
      nombreUsuario: new FormControl('', Validators.required),
      fecha: new FormControl(fecha, Validators.required),
      hora: new FormControl(this.HORA_INICIAL, Validators.required),
      horasReservadas: new FormControl(this.HORAS_MINIMAS_A_RESERVAR,
        [Validators.required, Validators.min(this.HORAS_MINIMAS_A_RESERVAR), Validators.max(this.HORAS_MAXIMAS_A_RESERVAR)]
      ),
      tipoCancha: new FormControl('', Validators.required),
      idCancha: new FormControl('', Validators.required)
    });
  }
}
