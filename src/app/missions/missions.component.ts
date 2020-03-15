import { Component, OnInit } from '@angular/core';

import { MissionsService } from '../missions.service';
import { NetworkResponse } from '../network-response';
import { LoggerService, LogLevel } from '../logger.service';

@Component({
  selector: 'missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  missions;

  constructor(
      private missionsService: MissionsService,
      private logger: LoggerService
    ) { }

  ngOnInit() {
    this.missionsService.getMissions().subscribe((response: NetworkResponse) => {
      if (response) {
        this.missions = response.data
        this.logger.log("Mission", LogLevel.Verbose, "Missions response:\r\n" + JSON.stringify(response));
      }
    });
  }
}
