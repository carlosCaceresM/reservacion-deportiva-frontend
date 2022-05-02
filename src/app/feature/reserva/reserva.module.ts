import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';

import { ReservaService } from './shared/service/reserva.service';
import { CanchaService } from './shared/service/cancha.service';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { CoreModule } from '@core/core.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ReservaComponent,
    ListarReservaComponent,
    CrearReservaComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    ReservaRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [ReservaService, CanchaService]
})
export class ReservaModule { }
