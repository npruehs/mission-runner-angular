import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Account } from './account';

@Injectable()
export class AccountService {
  accountId: string;

  constructor(
    private http: HttpService
  ) {
    this.accountId = '123';
  }

  getAccount(): Observable<Account> {
    return this.http.getData('http://localhost:8080/account/get?id=' + this.accountId);
  }
}
