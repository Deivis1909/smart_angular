import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetunitService } from '../../services/getunit.service';
import { Location } from '../../types/Location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';





@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {

  @Output() submitEvent = new EventEmitter();

  // VARIAVEL RESULTS É UM ARRAY DE OBJETO DE LOCATION
  results:Location[] = [];
  filteredResults:Location[]=[];

  // O ! DIZ QUE PODE INICIALIZAR VAZIO , JA VAI PREENCHER
  //PARA FORMGROUP FUNCIONAR QUE IMPORTAR NO MODULO GERENCIADOR APP.MODULE.TS
  // import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  formulario!:FormGroup;

  constructor(private formBuilder:FormBuilder,private getUnitService:GetunitService,private filterunitsService:FilterUnitsService){

  }

  ngOnInit(): void {

    // PEGA FUNCAO DO GetUnitService. getAllUnits()
    this.getUnitService.getAllUnits().subscribe(

      // data resultado da busca subscribe externa
      // recebe pega a variavel results e
      // add data.locations vinda da url na camada de service
      data => {
        this.results = data;
        this.filteredResults = data;

       });

    this.formulario= this.formBuilder.group({
      hour:'',
      showClosed:true
    })

  }


  // FormBuilder contructor do formulario


  // se a pessoa clica em filtra vem parar aqui
  onSubmit():void{
    //criando um objeto com as
    //variaveis locais que vai receber do formulario.value

    let{showClosed,hour} = this.formulario.value

    this.filteredResults = this.filterunitsService.filter(this.results,showClosed, hour);
    this.getUnitService.setFilteredUnits(this.filteredResults);

    // emitir que usuario submeteu o formulario
    this.submitEvent.emit();


  }

  onClean():void{
    console.log("CLEAN");
    this.formulario.reset();

  }


}
