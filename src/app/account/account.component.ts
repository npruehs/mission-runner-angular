import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';
import { Account } from '../account';
import { LoggerService, LogLevel } from '../logger.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account: Account;

  constructor(
      private accountService: AccountService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.accountService.getAccount().subscribe((response: Account) => {
      this.account = response;
      this.logger.log("Account", LogLevel.Verbose, "Account response:\r\n" + JSON.stringify(response));
    });
  }
}
