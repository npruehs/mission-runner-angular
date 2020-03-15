import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable()
export class CharactersService {

  constructor(
    private http: HttpService
  ) {}

  getCharacters() {
    return this.http.getData('http://localhost:8080/characters/get?accountId=123');
  }

}
