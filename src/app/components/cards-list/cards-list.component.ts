import { Location } from '../../types/Location.interface';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit {

  //@Input é 
  //em um componente que pode receber dados de um componente pai.
  //Isso permite a comunicação unidirecional de dados de um componente pai
  //para um componente filho.
 // recebe por input do elemento pai dele
 // no caso o appComponet.ts
 // que vem com a variavel unitLIST que é uma Location lista de unidades
 @Input() unitList: Location[] = [];

  constructor(){

  }

  ngOnInit(): void {




  }

}
