import { Component, OnInit } from '@angular/core';

import { Mission, MissionStatus } from '../mission';
import { MissionsService } from '../missions.service';
import { NetworkResponse } from '../network-response';
import { LoggerService, LogLevel } from '../logger.service';

@Component({
  selector: 'missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  missions: Mission[];
  missionIntervals;

  constructor(
      private missionsService: MissionsService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.missionsService.getMissions().subscribe((response: NetworkResponse) => {
      if (response) {
        this.missions = response.data;
        this.logger.log("Mission", LogLevel.Verbose, "Missions response:\r\n" + JSON.stringify(response));

        this.missionIntervals = {};

        for (let mission of this.missions) {
          if (mission.remainingTime <= 0) {
            mission.status = MissionStatus.Finished;
          }

          if (mission.status == MissionStatus.Running) {
            this.missionIntervals.mission = setInterval(() => {
              if (mission.remainingTime > 0) {
                --mission.remainingTime;
              } else {
                mission.remainingTime = 0;
                mission.status = MissionStatus.Finished;

                 clearInterval(this.missionIntervals.mission);
                 this.missionIntervals.mission = null;
              }
            }, 1000);
          }
        }
      }
    });
  }
}
