import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { AccountService} from './account.service';

import { Mission } from './mission';
import { Character } from './character';

@Injectable()
export class MissionsService {

  constructor(
    private http: HttpService,
    private accountService: AccountService
  ) {}

  getMissions() {
    return this.http.getData('http://localhost:8080/missions/get?accountId=123');
  }

  startMission(mission: Mission, assignedCharacters: Character[]) {
    let request: StartMissionRequest = {
      accountId: this.accountService.accountId,
      missionId: mission.id,
      characterIds: []
    };

    for (let assignedCharacter of assignedCharacters) {
      request.characterIds.push(assignedCharacter.id);
    }

    return this.http.postData('http://localhost:8080/missions/start', request);
  }

  finishMission(mission: Mission) {
    let request: FinishMissionRequest = {
      accountId: this.accountService.accountId,
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
