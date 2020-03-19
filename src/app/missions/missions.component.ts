import { Component, OnInit } from '@angular/core';

import { NetworkResponse } from '../network-response';
import { LoggerService, LogLevel } from '../logger.service';
import { LocalizationService } from '../localization.service';

import { Mission, MissionStatus } from './mission';
import { MissionsService } from './missions.service';

@Component({
  selector: 'missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  private missions: Mission[];

  constructor(
      private missionsService: MissionsService,
      private localizationService: LocalizationService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.missionsService.getMissions().subscribe((response: NetworkResponse<Mission[]>) => {
      if (response) {
        this.missions = response.data;
        this.logger.log("Mission", LogLevel.Verbose, "Missions response:\r\n" + JSON.stringify(response));

        this.localizationService.getLocalization().subscribe(() => {
          for (let mission of this.missions) {
            mission.localizedName = this.localizationService.get(mission.name);

            for (let requirement of mission.requirements) {
              requirement.localizedRequirement = this.localizationService.get(requirement.requirement);
            }
          }
        });
      }
    });
  }

  getMissions(): Mission[] {
    return this.missions;
  }
}
