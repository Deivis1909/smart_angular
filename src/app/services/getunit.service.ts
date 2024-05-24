import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { unitsResponse } from '../types/unitsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GetunitService {
  readonly apiurl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"


/// tem que importar no APP.MODULE ->
//import { HttpClientModule } from '@angular/common/http';

  constructor(private httpClient: HttpClient) {

  }

  //observable observa o retorno do unitsResponse que pega pela url

  getAllUnits():Observable<unitsResponse>{

    // tipo models/types tem que estar com as variaveis iguais
    //as da httpClient da Url da variavel a cima apiurl
    return this.httpClient.get<unitsResponse>(this.apiurl);

  }
}
