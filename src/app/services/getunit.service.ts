
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../types/Location.interface';
import { UnitsResponse } from '../types/UnitsResponse.interface';



@Injectable({
  providedIn: 'root'
})
export class GetunitService {




  readonly apiurl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  //// ESTADO -> VALOR ATUAL DA VARIAVEL 1
  //o BehaviorSubject é especialmente útil para gerenciar estados em aplicativos Angular, permitindo que os componentes compartilhem e reajam a mudanças de dados de forma reativa.
  //E stado envolve rastrear e atualizar esses dados
  //de Maneira eficiente e consistente à medida que o usuário interage com a aplicação.
  // NO CASO ALI INICIALIZA COM UM ARRAY DO OBJETO LOCATION VAZIO e
  // FICA OBSERVANDO A MUDANÇA DE COMPORTAMENTO
  private allUnitSubject:BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);

  //todas unidades OBSERVABLE -> OBSERVA a REQUISICAO a uma api externa
  // QUANDO A REQUISICAO FAZER , FAZ
  // DE UM ARRAY DE OBJETO LOCATION
  // QUE RECEBE O OBSERVABLE QUE quando uma variavel muda
  /// pode mudar outras variaveis que ele OBSERVA
  /// A MODODIFICAÇÃO DA VARIAVEL A CIMA ALLUNITSUBJECT COM ARRAY DE OBJETO LOCATION VAZIO
  ///ALGUEM QUE SE PODE MUDAR -> OBSERVABLE
  private allunits$: Observable<Location[]> = this.allUnitSubject.asObservable();

    // unidades filtradas
  private filteredUnits:Location[] = [];

/// tem que importar no APP.MODULE ->
//import { HttpClientModule } from '@angular/common/http';

  constructor(private httpClient: HttpClient) {

    //PROMISSE -> BUSCA DADOS EM UMA API EXTERNA
    //as da httpClient da Url da variavel a cima apiurl
    this.httpClient.get<UnitsResponse>(this.apiurl).subscribe(data => {
      // data resultado da busca subscribe externa
      // recebe pega a variavel results e
      // add data.locations vinda da url na camada de service
        // VARIAVEL 1 CRIADA A CIMA na class , QUE FICA OBSERVANDO O COMPORTAMENTO DA VARIAVEL
        // da api externa data.locations
        this.allUnitSubject.next(data.locations);
        this.filteredUnits = data.locations;
       });

  }



  getAllUnits():Observable<Location[]>{


    // pega a variavel que somar todas variaveis anteriores allunits
   return this.allunits$;

  }

  //funcao fake
  //funcao nao é OBSERVABLE PQ NAO FUNCAO FILTERED UNITS NÃO É ASSINCRONA
  getFilteredUnits(){

   return this.filteredUnits;
  }


  //filtro de verdade
  setFilteredUnits(value:Location[]){
    this.filteredUnits = value;

  }

}
