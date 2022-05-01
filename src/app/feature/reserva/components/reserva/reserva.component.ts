import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CrearReservaComponent } from '../crear-reserva/crear-reserva.component';

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

  abrirModal(id?: number) {
    this.dialog.open(CrearReservaComponent, {
      disableClose: true,
      height: '700px',
      width: '400px',
      data: {
        id: id
      },
    })
  }

}
