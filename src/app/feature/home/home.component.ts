import { TrmService } from './shared/service/trm.service';
import { Trm } from './shared/model/trm';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public titulo: String = 'Taza de Cambio Representativa del Mercado';
  public trm: Trm;
  constructor(
    private trmService: TrmService
  ) { }

  ngOnInit() {
    this.consultarTrm();
  }

  private consultarTrm(){
    this.trmService.consultar().subscribe(trm =>{
      this.trm = trm;
      console.log(this.trm);
    })
  }
}
