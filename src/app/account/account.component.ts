import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';
import { LoggerService, LogLevel } from '../logger.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account;

  constructor(
      private accountService: AccountService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.accountService.getAccount().subscribe(response => {
      this.account = response;
      this.logger.log("Account", LogLevel.Verbose, "Account response:\r\n" + JSON.stringify(response));
    });
  }
}
