import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account;

  constructor(
      private accountService: AccountService
    ) { }

  ngOnInit() {
    this.account = {}
    this.accountService.getAccount().subscribe(response => this.account = response);
  }
}
