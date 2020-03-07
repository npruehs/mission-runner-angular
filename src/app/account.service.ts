import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient
  ) {}

  getAccount() {
    return this.http.get('http://localhost:8080/account/get?id=123');
  }

}
