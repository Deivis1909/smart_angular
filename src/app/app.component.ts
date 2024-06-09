import { GetunitService } from './services/getunit.service';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/Location.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // ESTADO -> VALOR ATUAL DA VARIAVEL 1
  //o BehaviorSubject é especialmente útil para gerenciar estados em aplicativos Angular, permitindo que os componentes compartilhem e reajam a mudanças de dados de forma reativa.
  //E stado envolve rastrear e atualizar esses dados
  //de maneira eficiente e consistente à medida que o usuário interage com a aplicação.
  // NO CASO ALI INICIALIZA COM UM ARRAY DO OBJETO LOCATION VAZIO e
  // FICA OBSERVANDO A MUDANÇA DE COMPORTAMENTO
  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];




  onSubmit(){

   // quando submete faz a variavel showList ficar true e
   // com isso chama o component cards-list
    this.unitsList = this.getUnitService.getFilteredUnits();
    this.showList.next(true);


  }
  constructor(private getUnitService:GetunitService){

  }


}
