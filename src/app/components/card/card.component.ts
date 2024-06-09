import { Component, Input } from '@angular/core';
import { Location } from '../../types/Location.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  //@Input é
  //em um componente que pode receber dados de um componente pai.
  //Isso permite a comunicação unidirecional de dados de um componente pai
  //para um componente filho.

  @Input() card!: Location;

}
