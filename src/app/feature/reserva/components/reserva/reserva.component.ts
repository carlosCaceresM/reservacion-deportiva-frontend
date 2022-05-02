import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrearReservaComponent } from '../crear-reserva/crear-reserva.component';
import { ReservaService } from './../../shared/service/reserva.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(
    private reservaService: ReservaService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.obtenerMensajeCambio();
  }


  public abrirModal(id?: number) {
    this.dialog.open(CrearReservaComponent, {
      disableClose: true,
      height: '400px',
      width: '500px',
      data: {
        id: id
      },
    })
  }

  private obtenerMensajeCambio() {
    this.reservaService.obtenerMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', { duration: 5000 });
    });
  }

}
