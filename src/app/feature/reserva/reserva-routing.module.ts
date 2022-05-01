import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './components/reserva/reserva.component';

const routes: Routes = [
  {

      path: '',
      children: [
        {
          path: '',
          component: ReservaComponent,
        },
        {
          path: 'crear',
          component: CrearReservaComponent
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
