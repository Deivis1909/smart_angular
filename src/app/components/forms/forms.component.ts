import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetunitService } from '../../services/getunit.service';
import { Location } from '../../types/Location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {


  // VARIAVEL RESULTS É UM ARRAY DE OBJETO DE LOCATION
  results:Location[] = [];
  filteredResults:Location[]=[];

  // O ! DIZ QUE PODE INICIALIZAR VAZIO , JA VAI PREENCHER
  //PARA FORMGROUP FUNCIONAR QUE IMPORTAR NO MODULO GERENCIADOR APP.MODULE.TS
  // import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  formulario!:FormGroup;

  ngOnInit(): void {

    this.unitService.getAllUnits().subscribe(

      // data resultado da busca subscribe externa
      // recebe pega a variavel results e
      // add data.locations vinda da url na camada de service
      data => {
        this.results = data.locations;
        this.filteredResults = data.locations;

       });

    this.formulario= this.formBuilder.group({
      hour:'',
      showClosed:false
    })

  }


  // FormBuilder contructor do formulario
  constructor(private formBuilder:FormBuilder,private unitService:GetunitService){

  }

  // se a pessoa clica em filtra vem parar aqui
  onSubmit():void{

    console.log(this.formulario.value)

    // se formulario value é difernte de closed fechado
    if(!this.formulario.value.showClosed){

      console.log("entrou");

      ///filtrar so pelos estabelecimentos abertos -OPENED
      this.filteredResults = this.results.filter(location => location.opened === true)

    }else{

      this.filteredResults = this.results;

    }

  }

  onClean():void{
    console.log("CLEAN");
    this.formulario.reset();

  }


}
