import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public titulo: string = 'Confirmar';
  public mensaje: string = '¿Esta seguro de eliminar la Reserva?';

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  cerrarModal(res: boolean): void {
    this.modal.close(res);
  };

}
