import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrearReservaComponent } from '../crear-reserva/crear-reserva.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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

}
