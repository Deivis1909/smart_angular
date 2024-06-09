import { Injectable } from '@angular/core';
import { Location } from '../types/Location.interface';

//variavel tipe tipo um ENUM que pode ser qualquer coisa HOUR_INDEXES = 'MORNING'  OU 'AFERNOON' OU 'NIGHT'
type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';


// constante objeto para pegar as lojas aberta naquela hora
const OPENING_HOURS= {
  morning:{
    firt:'06',
    last:'12'
  },
  afternoon:{
    firt:'06',
    last:'18'

  },
  night:{
    firt:'18',
    last:'23'

  }

}

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {
  transformWeekday(weekday: number){
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  // filtrando unidades abertas ou fechadas
  filterUnits(unidade:Location, open_hour:string,closed_hour:string){

    //UNIDADE.SCHEDULES -> HORARIOS DE FUNCINAMENTO
    // NEM TODAS UNIDADES TEM UNIDADE.SCHENDULES SE NAO TIVER RETORNA TRUE
    if(!unidade.schedules) return true;



    // transformando variaveis que chagaram de parametro em numeros inteiros com indice de 10 posiçoes
    let open_hour_filter = parseInt(open_hour,10);
    let close_hour_filter = parseInt(closed_hour,10);

    // filtrando pelo dia da semana escolhido para saber
    //pq sabado e domingo tem horario diferente
    // todays_weekday recebe pega o
    //transformWeekday() -> transforma um numero em dia da semana
     //new Date().getDate()) -> pega a data atual
    let todays_weekday = this.transformWeekday(new Date().getDate());//vai retornar um inteiro domingo = 0 , segunda = 1

    //verficando OPENED

    //SCHEDULES -> HORARIOS DE FUNCIONAMENTO
    // laço de repeticao para pegae todos os horarios do objeto unidade
    //repete acao enquanto  i  < unidade.horario.lenght( pega todos os horarios do objeto unidade )
    for(let i = 0 ; i< unidade.schedules.length;i++){

      //variavel local schedule_hour
      //a variavel do horario "volta do momento no laço de repeticao"
       let schedule_hour = unidade.schedules[i].hour

    // variavel local schedule_weekday = recebe a
    //a variavel do weedays dia da semana "volta do momento no laço de repeticao"

    let schedule_weekday = unidade.schedules[i].weekdays


    /// se
    /// TODAYS_WEEKDAY -> dia atual
    /// for iguual a um dos ->
     //SCHEDULE_WEEKDAY PERCORRE TODOS OS DIAS DA SEMANA CADASTRADOS com HORARIOS ->
     /// SEG A SEX HORARIO FUNCIONAMENTO TAL , SABADO HORARIO FUNCIONAMENTO TAL
     // E ACHA UM IGUAL AO DIA EXPECIFICO COM HORARIO DE FUNCIONAMENTO ESPEFICICO
    if(todays_weekday === schedule_weekday){

    //se variavel DIA COM HORARIO DE FUNCIONAMENTO DEPOIS DE PERCORRER TODOS NO LAÇO
    // for DIFERENTE DE fechada entao continua o filtro
      if(schedule_hour !== 'Fechada'){

        //CRIA A SE VARIAVEIS ARRAYS LOCAIS para pegar horario de abertura e
        //horario de fechamento split pelo "ÁS"

        let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')

        //TRANSFORMANDO PRA UM INTEIRO
        let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
        let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

        if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
        else return false
      }
    }
  }

  /// SE NENHUM HORARIO ENCAIXAR EM NENHUM ENUM PERFIL DE DIAS
  //COM HORARIOS DE FUNCIONAMENTO CADASTRADOS
  return false;
}

filter(results:Location[], showClosed: boolean,hour:String){

  let resultadoIntermediario = results;

  if(!showClosed){

    ///filtrar so pelos estabelecimentos abertos -OPENED
    resultadoIntermediario = results.filter(location => location.opened === true)

  }

  if(hour){
     //CONST HOUR RECEBE O ARRAY DE OBJETO OPENING_HOURS[] ARRAY ->
  //PEGA DO FORMULARIO O VALOR DA HORA E
  //SETA O VALOR entre "morning","aftermoon","night" DO ENUM HOUR_INDEXES .PRIMEIRO QUE ENCONTRAR
  // se formulario value é difernte de closed fechado
  const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].firt

  const CLOSED_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last

    // variavel filteredResults recebe o filtro do resultadoIntermediario
      // pela location
      return resultadoIntermediario.filter(location => this.filterUnits(location,OPEN_HOUR,CLOSED_HOUR));

  }else{
     return resultadoIntermediario;
  }





}





  constructor() { }
}
