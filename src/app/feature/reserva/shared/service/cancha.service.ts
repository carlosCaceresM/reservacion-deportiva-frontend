import { DtoCancha } from '../model/DtoCancha';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core-service/http.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  constructor(protected http: HttpService) { }

  public consultarPorTipoCancha(idCncha: number) {
    return this.http.doGet<DtoCancha[]>(`${environment.endpoint}/canchas/tipo/${idCncha}`,
      this.http.optsName('consultar Canchas por tipo'));
  }
}
