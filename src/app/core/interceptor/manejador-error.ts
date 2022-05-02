import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../environments/environment';
import { HTTP_ERRORES_CODIGO } from './http-codigo-error';

@Injectable()
export class ManejadorError implements ErrorHandler {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  handleError(error: string | Error): void {
    const mensajeError = this.mensajePorDefecto(error);
    this.imprimirErrorConsola(mensajeError);
    this.montrarMensaje(mensajeError);
  }

  private mensajePorDefecto(error) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return HTTP_ERRORES_CODIGO.NO_HAY_INTERNET;
      }
      if (error.hasOwnProperty('status') && !error.error.hasOwnProperty('mensaje')) {
        return this.obtenerErrorHttpCode(error.status);
      }
    }
    return error;
  }

  private imprimirErrorConsola(mensaje): void {
    let prueba: string = mensaje.error.mensaje;
    const respuesta = {
      fecha: new Date().toLocaleString(),
      path: window.location.href,
      prueba,
    };
    if (!environment.production) {
      window.console.error('Error inesperado:\n', respuesta);
    }
  }

  private montrarMensaje(mensaje): void {
    this.snackBar.open(mensaje.error.mensaje, 'ERROR', { duration: 5000 });
  }

  public obtenerErrorHttpCode(httpCode: number): string {
    if (HTTP_ERRORES_CODIGO.hasOwnProperty(httpCode)) {
      return HTTP_ERRORES_CODIGO.PETICION_FALLIDA;
    }
    return HTTP_ERRORES_CODIGO[httpCode];
  }
}
