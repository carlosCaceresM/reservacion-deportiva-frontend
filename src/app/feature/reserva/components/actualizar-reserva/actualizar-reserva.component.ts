
import { ReservaService } from './../../shared/service/reserva.service';
import { DtoCancha, DtoTipoCancha } from './../../shared/model/DtoCancha';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CanchaService } from '../../shared/service/cancha.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../../shared/model/reserva';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '@core/components/modal/modal.component';

@Component({
  selector: 'app-actualizar-reserva',
  templateUrl: './actualizar-reserva.component.html',
  styleUrls: ['./actualizar-reserva.component.css']
})
export class ActualizarReservaComponent implements OnInit {

  HORAS_MINIMAS_A_RESERVAR = 1;
  HORAS_MAXIMAS_A_RESERVAR = 5;
  HORA_INICIAL = '17:00';

  public fechaActual = moment();
  public listaCanchas: DtoCancha[];
  public formReserva: FormGroup;

  public confirmacionActualizar = '¿Esta seguro de Actualizar la reserva?'
  public titulo: string = 'Actualizar Reserva';
  public horas: string[] = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  public listaTipoCanchas: DtoTipoCancha[] = [
    { id: 1, nombre: 'Futbol' },
    { id: 2, nombre: 'Boleibol' }
  ];

  constructor(
    private canchaService: CanchaService,
    private reservaService: ReservaService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.initFormReserva();
    this.cargarDatosEdicion(id);
  }

  public consultarCanchasPorTipo(event) {
    this.canchaService.consultarPorTipoCancha(event).subscribe(datos => {
      this.listaCanchas = datos;
    })
  }

  public actualizarReserva() {
    const refConfirmacion = this.modalService.open(ModalComponent, { animation: true, backdrop: 'static', keyboard: false });
    refConfirmacion.componentInstance.mensaje = this.confirmacionActualizar;

    refConfirmacion.result.then((value: boolean) => {
      if (value) {
        this.reservaService.actualizar(this.crearEntidad()).subscribe(() => {
          this.formReserva.reset();
          this.router.navigate(['/reserva']);
        });
      } else{
        this.formReserva.reset();
          this.router.navigate(['/reserva']);
      }
    });

  }

  private crearEntidad(): Reserva {
    const id: number = this.formReserva.value['id'];
    const nombreUsuario: string = this.formReserva.value['nombreUsuario'];
    const horasReservadas: number = this.formReserva.value['horasReservadas'];
    const fecha: string = moment(`${this.formReserva.value['fecha']} ${this.formReserva.value['hora']}`)
      .format('YYYY-MM-DD HH:mm:ss');
    const idCancha: number = this.formReserva.value['idCancha'].id;
    const tafira: number = this.formReserva.value['idCancha'].tafira;

    return new Reserva(nombreUsuario, fecha, horasReservadas, tafira, idCancha , id);
  }

  private initFormReserva() {
    const fecha: string = this.fechaActual.format("YYYY-MM-DD");
    this.formReserva = new FormGroup({
      id: new FormControl(0, Validators.required),
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

  private cargarDatosEdicion(id: number) {
    this.reservaService.consultarPorId(id).subscribe(res => {
      let fecha = moment(res.fecha).format('YYYY-MM-DD');
      let hora = moment(res.fecha).format('HH:mm');

      this.formReserva.setValue({
        id: res.id,
        nombreUsuario: res.nombreUsuario,
        fecha: fecha,
        hora: hora,
        horasReservadas: res.horasReservadas,
        tipoCancha: new FormControl('', Validators.required),
        idCancha: new FormControl('', Validators.required)
      });
    });
  }

}
