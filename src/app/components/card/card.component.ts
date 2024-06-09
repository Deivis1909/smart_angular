import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../types/Location.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit{

  //@Input é
  //em um componente que pode receber dados de um componente pai.
  //Isso permite a comunicação unidirecional de dados de um componente pai
  //para um componente filho.

  constructor() { }

  ngOnInit(): void {
  }

  @Input() card!: Location;

}
