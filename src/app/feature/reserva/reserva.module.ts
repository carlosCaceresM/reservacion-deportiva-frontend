import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { ReservaService } from './shared/service/reserva.service';
import { CanchaService } from './shared/service/cancha.service';
import { SharedModule } from '@shared/shared.module';
import { ActualizarReservaComponent } from './components/actualizar-reserva/actualizar-reserva.component';


@NgModule({
  declarations: [
    ListarReservaComponent,
    CrearReservaComponent,
    ActualizarReservaComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService, CanchaService]
})
export class ReservaModule { }
