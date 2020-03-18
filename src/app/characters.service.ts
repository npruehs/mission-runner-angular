import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { NetworkResponse } from './network-response';
import { Character } from './character';

@Injectable()
export class CharactersService {

  constructor(
    private http: HttpService
  ) {}

  getCharacters(): Observable<NetworkResponse<Character[]>> {
    return this.http.getData<NetworkResponse<Character[]>>('http://localhost:8080/characters/get?accountId=123');
  }
}
