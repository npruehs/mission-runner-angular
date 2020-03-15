import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable()
export class MissionsService {

  constructor(
    private http: HttpService
  ) {}

  getMissions() {
    return this.http.getData('http://localhost:8080/missions/get?accountId=123');
  }

}
