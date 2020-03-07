import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class MissionsService {

  constructor(
    private http: HttpClient
  ) {}

  getMissions() {
    return this.http.get('http://localhost:8080/missions/get?accountId=123');
  }

}
