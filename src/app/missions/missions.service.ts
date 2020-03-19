import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../http.service';
import { NetworkResponse } from '../network-response';

import { AccountService} from '../account/account.service';
import { Character } from '../characters//character';

import { Mission } from './mission';

@Injectable()
export class MissionsService {

  constructor(
    private http: HttpService,
    private accountService: AccountService
  ) {}

  getMissions(): Observable<NetworkResponse<Mission[]>> {
    return this.http.getData('http://localhost:8080/missions/get?accountId=123');
  }

  startMission(mission: Mission, assignedCharacters: Character[]): Observable<Object> {
    let request: StartMissionRequest = {
      accountId: this.accountService.getAccountId(),
      missionId: mission.id,
      characterIds: []
    };

    for (let assignedCharacter of assignedCharacters) {
      request.characterIds.push(assignedCharacter.id);
    }

    return this.http.postData('http://localhost:8080/missions/start', request);
  }

  finishMission(mission: Mission): Observable<Object> {
    let request: FinishMissionRequest = {
      accountId: this.accountService.getAccountId(),
      missionId: mission.id,
    };

    return this.http.postData('http://localhost:8080/missions/finish', request);
  }
}

interface StartMissionRequest {
  accountId: string;
  missionId: number;
  characterIds: number[];
}

interface FinishMissionRequest {
  accountId: string;
  missionId: number;
}
