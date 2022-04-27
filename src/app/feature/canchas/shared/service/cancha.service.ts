import { environment } from 'src/environments/environment';
import { HttpService } from '@core-service/http.service';
import { Injectable } from '@angular/core';
import { Cancha } from '../model/cancha';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  constructor(protected http: HttpService) {}

  public consultarPorTipoCancha(id: number) {
    return this.http.doGet<Cancha[]>(`${environment.endpoint}/canchas/tipo/${id}`, this.http.optsName('consultar Canchas por tipo'));
  }
}

