import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class CharactersService {

  constructor(
    private http: HttpClient
  ) {}

  getCharacters() {
    return this.http.get('http://localhost:8080/characters/get?accountId=123');
  }

}
