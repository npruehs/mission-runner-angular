import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable()
export class AccountService {
  accountId = '123';

  constructor(
    private http: HttpService
  ) {}

  getAccount() {
    return this.http.getData('http://localhost:8080/account/get?id=' + this.accountId);
  }
}
